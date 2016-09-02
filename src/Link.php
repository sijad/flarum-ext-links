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
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'parent_id' => 'integer',
        'children' => 'array',
        'is_internal' => 'boolean',
        'is_newtab' => 'boolean',
    ];

    public static function boot()
    {
        parent::boot();

        static::deleted(function ($link) {
            $children = $link->children();
            $children->delete();
        });
    }

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
        $link->is_internal         = (bool) $isInternal;
        $link->is_newtab           = (bool) $isNewtab;

        return $link;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo('Sijad\Links\Link', 'parent_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function children()
    {
        return $this->hasMany('Sijad\Links\Link', 'parent_id');
    }
}
