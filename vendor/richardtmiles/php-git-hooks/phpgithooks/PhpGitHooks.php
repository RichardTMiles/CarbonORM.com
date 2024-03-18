<?php

namespace PhpGitHooks;

use CarbonPHP\Abstracts\Background;

class PhpGitHooks
{
    public static function install(): void
    {

        echo 'file://' . __FILE__ . ':' . __LINE__ . PHP_EOL;

        $directory = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.githooks';

        $commands = [
            "git config core.hooksPath $directory",
            "chmod +x $directory/*",
            "echo 'Updated git hooks to use php-git-hooks in ($directory) directory.'",
            "git config core.hooksPath"
        ];

        foreach ($commands as $command) {

            Background::executeAndCheckStatus($command);

        }

    }

}