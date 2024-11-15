// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CarbonFootprintTracker {
    struct User {
        string name;
        uint256 totalFootprint;
        uint256 totalCredits;
        bool isRegistered;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed user, string name);
    event FootprintAdded(address indexed user, uint256 footprint);
    event CreditsAdded(address indexed user, uint256 credits);

    // Register a user with their name
    function registerUser(string memory _name) public {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender] = User(_name, 0, 0, true);
        emit UserRegistered(msg.sender, _name);
    }

    // Add carbon footprint to the user's total footprint
    function addCarbonFootprint(uint256 _amount) public {
        require(users[msg.sender].isRegistered, "User not registered");
        users[msg.sender].totalFootprint += _amount;
        emit FootprintAdded(msg.sender, _amount);
    }

    // Add carbon credits to the user's total credits
    function addCarbonCredits(uint256 _credits) public {
        require(users[msg.sender].isRegistered, "User not registered");
        users[msg.sender].totalCredits += _credits;
        emit CreditsAdded(msg.sender, _credits);
    }

    // Get user information
    function getUserInfo(address _user) public view returns (string memory, uint256, uint256) {
        require(users[_user].isRegistered, "User not registered");
        User memory user = users[_user];
        return (user.name, user.totalFootprint, user.totalCredits);
    }
}
