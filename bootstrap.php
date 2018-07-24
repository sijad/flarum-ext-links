<?php

/*
 * (c) Sajjad Hashemian <wolaws@gmail.com>
 */

use Flarum\Extend;
use Sijad\Links\Listener;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    function (Dispatcher $events) {
        $events->subscribe(Listener\AddLinksApi::class);
        $events->subscribe(Listener\AddLinksRelationship::class);
    }
];
