<?php
require_once('plugins/login-servers.php');

ini_set("display_errors", 0);

/** Set supported servers
 * @param array array($domain) or array($domain => $description) or array($category => array())
 * @param string
 */

return new AdminerLoginServers([
    "hasura" => array("server" => "db", "driver" => "pgsql"),
]);
