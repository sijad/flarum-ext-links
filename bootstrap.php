<?php

/*
 * (c) Sajjad Hashemian <wolaws@gmail.com>
 */

use Flarum\Extend;
use Sijad\Links\Listener;
use Sijad\Links\Api\Controller;
use Illuminate\Contracts\Events\Dispatcher;

return [
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),

    (new Extend\Routes('api'))
        ->post('/links', 'links.create', Controller\CreateLinkController::class)
        ->post('/links/order', 'links.order', Controller\OrderLinksController::class)
        ->patch('/links/{id}', 'links.update', Controller\UpdateLinkController::class)
        ->delete('/links/{id}', 'links.delete', Controller\DeleteLinkController::class),

    function (Dispatcher $events) {
        $events->subscribe(Listener\AddLinksRelationship::class);
    }
];
