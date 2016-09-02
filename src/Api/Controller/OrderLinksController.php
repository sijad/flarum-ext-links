<?php

/*
 * (c) Sajjad Hashemian <wolaws@gmail.com>
 */

namespace Sijad\Links\Api\Controller;

use Flarum\Core\Access\AssertPermissionTrait;
use Flarum\Http\Controller\ControllerInterface;
use Sijad\Links\Link;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\EmptyResponse;

class OrderLinksController implements ControllerInterface
{
    use AssertPermissionTrait;

    /**
     * {@inheritdoc}
     */
    public function handle(ServerRequestInterface $request)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $order = array_get($request->getParsedBody(), 'order');

        Link::query()->update([
            'position' => null,
            'parent_id' => null
        ]);

        foreach ($order as $i => $parent) {
            $parentId = array_get($parent, 'id');

            Link::where('id', $parentId)->update(['position' => $i]);

            if (isset($parent['children']) && is_array($parent['children'])) {
                foreach ($parent['children'] as $j => $childId) {
                    Link::where('id', $childId)->update([
                        'position' => $j,
                        'parent_id' => $parentId
                    ]);
                }
            }
        }

        return new EmptyResponse(204);
    }
}
