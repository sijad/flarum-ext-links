<?php

/*
 * (c) Sajjad Hashemian <wolaws@gmail.com>
 */

namespace Sijad\Links\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\DiscussionSerializer;

class LinkSerializer extends AbstractSerializer
{
    /**
     * {@inheritdoc}
     */
    protected $type = 'links';

    /**
     * {@inheritdoc}
     */
    protected function getDefaultAttributes($link)
    {
        $attributes = [
            'id'         => $link->id,
            'title'      => $link->title,
            'url'        => $link->url,
            'position'   => $link->position,
        ];

        if ($this->actor->isAdmin()) {
            $attributes['type'] = $link->type;
            $attributes['ref_id'] = $link->ref_id;
        }

        return $attributes;
    }
}
