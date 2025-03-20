<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Smartphone;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'text' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $user = Auth::user();
        $smartphone = Smartphone::findOrFail($request->smartphone_id);
        $review = Review::where('user_id', $user->id)->where('smartphone_id', $smartphone->id)->first();

        $review->text = $request->text;
        $review->rating = $request->rating;
        $review->save();

        return back();
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'text' => 'required|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $user = Auth::user();
        $smartphone = Smartphone::findOrFail($request->smartphone_id);

        $review = new Review([
            'user_id' => $user->id,
            'smartphone_id' => $smartphone->id,
            'text' => $request->text,
            'rating' => $request->rating,
        ]);
        $review->save();

        return back();
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'smartphone_id' => 'required|integer',
        ]);

        $user = Auth::user();
        $smartphone = Smartphone::findOrFail($request->smartphone_id);
        $review = Review::where('user_id', $user->id)->where('smartphone_id', $smartphone->id)->first();

        $review->delete();

        return back();
    }
}
