<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles
        $roles = [
            'admin',
            'user',
        ];
        $permissionEditDatabase = Permission::create(['name' => 'edit-database']);

        foreach ($roles as $role) {
            $role = Role::create(['name' => $role]);
            if ($role->name === 'admin') {
                $role->givePermissionTo($permissionEditDatabase);
                $permissionEditDatabase->assignRole($role);
            }
        }
    }
}
