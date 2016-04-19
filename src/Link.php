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
     * @param bool $isInternal
     * @param bool $isNewtab
     * @return static
     */
    public static function build($name, $url, $isInternal, $isNewtab)
    {
        $link = new static;

        $link->title               = $name;
        $link->url                 = $url;
        $link->is_internal         = $isInternal;
        $link->is_newtab           = $isNewtab;

        return $link;
    }
}
