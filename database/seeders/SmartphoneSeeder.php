<?php

namespace Database\Seeders;

use App\Models\Smartphone;
use Database\Factories\SmartphoneSpecificationFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class SmartphoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ensure source photos and storage directory exist
        $photosPath = database_path('seeders/photos');
        if (!File::exists($photosPath)) {
            File::makeDirectory($photosPath, 0755, true);
        }
        Storage::disk('public')->makeDirectory('smartphones');

        DB::table('smartphone_images')->truncate();
        DB::table('smartphone_specifications')->truncate();
        DB::table('smartphones')->truncate();
        
        // create smartphones
        Smartphone::factory()
            ->count(10)
            ->create();

        // seed images from local photos folder
        $files = File::files($photosPath);
        $order = ['front','back','bottom','hold','quarter','side'];
        // group all files by angle for global fallback
        $globalByAngle = [];
        foreach ($files as $f) {
            $parts = explode('_', pathinfo($f->getFilename(), PATHINFO_FILENAME));
            if (count($parts) === 2) {
                [$idx, $ang] = $parts;
                $globalByAngle[$ang][] = $f;
            }
        }
        $smartphones = Smartphone::all();
        foreach ($smartphones as $index => $smartphone) {
            // filter smartphone-specific files
            $smartFiles = array_filter($files, fn($file) => Str::startsWith($file->getFilename(), $index.'_'));
            if (empty($smartFiles)) {
                continue; // no source files for this smartphone
            }
            // group by angle
            $byAngle = [];
            foreach ($smartFiles as $file) {
                [$idx, $angle] = explode('_', pathinfo($file->getFilename(), PATHINFO_FILENAME));
                $byAngle[$angle][] = $file;
            }
            foreach ($order as $angle) {
                // choose file for this angle or random fallback
                if (!empty($byAngle[$angle])) {
                    $file = $byAngle[$angle][0];
                } elseif (!empty($globalByAngle[$angle])) {
                    // random fallback from same angle across all smartphones
                    $file = $globalByAngle[$angle][array_rand($globalByAngle[$angle])];
                } else {
                    continue; // no image available for this angle
                }
                $extension = $file->getExtension();
                $filename = $smartphone->id.'_'.$angle.'.'.$extension;
                $path = Storage::disk('public')->putFileAs('smartphones', $file->getRealPath(), $filename);
                $smartphone->images()->create(['image_path' => $path]);
            }
        }

        // seed specifications for each smartphone
        foreach ($smartphones as $smartphone) {
            $specs = SmartphoneSpecificationFactory::generateSpecifications();
            $smartphone->specifications()->createMany($specs);
        }
    }
}
