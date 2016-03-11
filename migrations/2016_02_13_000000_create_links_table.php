<?php

/*
 * (c) Sajjad Hashemian <wolaws@gmail.com>
 */

namespace Sijad\Links\Migration;

use Flarum\Database\AbstractMigration;
use Illuminate\Database\Schema\Blueprint;

class CreateLinksTable extends AbstractMigration
{
    public function up()
    {
        $this->schema->create('links', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 50);
            $table->string('type', 30);
            $table->string('url', 255);
            $table->integer('ref_id')->unsigned()->nullable();
            $table->integer('position')->nullable();
        });
    }

    public function down()
    {
        $this->schema->drop('links');
    }
}
