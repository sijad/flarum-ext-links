<?php

/*
 * (c) Sajjad Hashemian <wolaws@gmail.com>
 */

namespace Sijad\Links;

use Flarum\Database\AbstractModel;

class Link extends AbstractModel
{
    /**
     * {@inheritdoc}
     */
    protected $table = 'links';

    /**
     * Create a new link.
     *
     * @param string $name
     * @param string $url
     * @param string $type
     * @param string $ref_id
     * @return static
     */
    public static function build($name, $url, $type = null, $ref_id = null)
    {
        $link = new static;

        $link->title       = $name;
        $link->url         = $url;
        $link->type        = $type ?: 'url';
        $link->ref_id      = $ref_id;

        return $link;
    }
}
