<?php

use Flarum\Database\Migration;

return Migration::addColumns('links', [
    'parent_id' => ['integer', 'unsigned' => true, 'nullable' => true]
]);
