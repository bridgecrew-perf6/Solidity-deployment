// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Inbox {
    string public message;

    function set_mess(string memory initialMessage) public {
        message = initialMessage;
    }
}
