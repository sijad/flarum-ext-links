<?php

$header = <<<EOF
(c) Sajjad Hashemian <wolaws@gmail.com>
EOF;

Symfony\CS\Fixer\Contrib\HeaderCommentFixer::setHeader($header);

$finder = Symfony\CS\Finder\DefaultFinder::create()
    ->exclude('js')
    ->exclude('less')
    ->in(__DIR__);

return Symfony\CS\Config\Config::create()
    ->level(Symfony\CS\FixerInterface::PSR2_LEVEL)
    ->fixers([
        'short_array_syntax',
        'header_comment',
        '-psr0'
    ])
    ->finder($finder);
