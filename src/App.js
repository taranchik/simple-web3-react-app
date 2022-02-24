import "./App.css";

import React, { Component } from "react";

import Web3 from "web3";

var web3;
const contractAddress = "0x0C7837C3F9CDCc4Ff1c5B5953177E3E5182f2046";

const contractJsonInterface = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "string",
        name: "uri",
        type: "string",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const byteCode = {
  functionDebugData: {
    "@_167": {
      entryPoint: null,
      id: 167,
      parameterSlots: 2,
      returnSlots: 0,
    },
    "@_1916": {
      entryPoint: null,
      id: 1916,
      parameterSlots: 0,
      returnSlots: 0,
    },
    "@_23": {
      entryPoint: null,
      id: 23,
      parameterSlots: 0,
      returnSlots: 0,
    },
    "@_msgSender_1566": {
      entryPoint: 216,
      id: 1566,
      parameterSlots: 0,
      returnSlots: 1,
    },
    "@_transferOwnership_103": {
      entryPoint: 224,
      id: 103,
      parameterSlots: 1,
      returnSlots: 0,
    },
    extract_byte_array_length: {
      entryPoint: 598,
      id: null,
      parameterSlots: 1,
      returnSlots: 1,
    },
    panic_error_0x22: {
      entryPoint: 652,
      id: null,
      parameterSlots: 0,
      returnSlots: 0,
    },
  },
  generatedSources: [
    {
      ast: {
        nodeType: "YulBlock",
        src: "0:516:13",
        statements: [
          {
            body: {
              nodeType: "YulBlock",
              src: "58:269:13",
              statements: [
                {
                  nodeType: "YulAssignment",
                  src: "68:22:13",
                  value: {
                    arguments: [
                      {
                        name: "data",
                        nodeType: "YulIdentifier",
                        src: "82:4:13",
                      },
                      {
                        kind: "number",
                        nodeType: "YulLiteral",
                        src: "88:1:13",
                        type: "",
                        value: "2",
                      },
                    ],
                    functionName: {
                      name: "div",
                      nodeType: "YulIdentifier",
                      src: "78:3:13",
                    },
                    nodeType: "YulFunctionCall",
                    src: "78:12:13",
                  },
                  variableNames: [
                    {
                      name: "length",
                      nodeType: "YulIdentifier",
                      src: "68:6:13",
                    },
                  ],
                },
                {
                  nodeType: "YulVariableDeclaration",
                  src: "99:38:13",
                  value: {
                    arguments: [
                      {
                        name: "data",
                        nodeType: "YulIdentifier",
                        src: "129:4:13",
                      },
                      {
                        kind: "number",
                        nodeType: "YulLiteral",
                        src: "135:1:13",
                        type: "",
                        value: "1",
                      },
                    ],
                    functionName: {
                      name: "and",
                      nodeType: "YulIdentifier",
                      src: "125:3:13",
                    },
                    nodeType: "YulFunctionCall",
                    src: "125:12:13",
                  },
                  variables: [
                    {
                      name: "outOfPlaceEncoding",
                      nodeType: "YulTypedName",
                      src: "103:18:13",
                      type: "",
                    },
                  ],
                },
                {
                  body: {
                    nodeType: "YulBlock",
                    src: "176:51:13",
                    statements: [
                      {
                        nodeType: "YulAssignment",
                        src: "190:27:13",
                        value: {
                          arguments: [
                            {
                              name: "length",
                              nodeType: "YulIdentifier",
                              src: "204:6:13",
                            },
                            {
                              kind: "number",
                              nodeType: "YulLiteral",
                              src: "212:4:13",
                              type: "",
                              value: "0x7f",
                            },
                          ],
                          functionName: {
                            name: "and",
                            nodeType: "YulIdentifier",
                            src: "200:3:13",
                          },
                          nodeType: "YulFunctionCall",
                          src: "200:17:13",
                        },
                        variableNames: [
                          {
                            name: "length",
                            nodeType: "YulIdentifier",
                            src: "190:6:13",
                          },
                        ],
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: "outOfPlaceEncoding",
                        nodeType: "YulIdentifier",
                        src: "156:18:13",
                      },
                    ],
                    functionName: {
                      name: "iszero",
                      nodeType: "YulIdentifier",
                      src: "149:6:13",
                    },
                    nodeType: "YulFunctionCall",
                    src: "149:26:13",
                  },
                  nodeType: "YulIf",
                  src: "146:81:13",
                },
                {
                  body: {
                    nodeType: "YulBlock",
                    src: "279:42:13",
                    statements: [
                      {
                        expression: {
                          arguments: [],
                          functionName: {
                            name: "panic_error_0x22",
                            nodeType: "YulIdentifier",
                            src: "293:16:13",
                          },
                          nodeType: "YulFunctionCall",
                          src: "293:18:13",
                        },
                        nodeType: "YulExpressionStatement",
                        src: "293:18:13",
                      },
                    ],
                  },
                  condition: {
                    arguments: [
                      {
                        name: "outOfPlaceEncoding",
                        nodeType: "YulIdentifier",
                        src: "243:18:13",
                      },
                      {
                        arguments: [
                          {
                            name: "length",
                            nodeType: "YulIdentifier",
                            src: "266:6:13",
                          },
                          {
                            kind: "number",
                            nodeType: "YulLiteral",
                            src: "274:2:13",
                            type: "",
                            value: "32",
                          },
                        ],
                        functionName: {
                          name: "lt",
                          nodeType: "YulIdentifier",
                          src: "263:2:13",
                        },
                        nodeType: "YulFunctionCall",
                        src: "263:14:13",
                      },
                    ],
                    functionName: {
                      name: "eq",
                      nodeType: "YulIdentifier",
                      src: "240:2:13",
                    },
                    nodeType: "YulFunctionCall",
                    src: "240:38:13",
                  },
                  nodeType: "YulIf",
                  src: "237:84:13",
                },
              ],
            },
            name: "extract_byte_array_length",
            nodeType: "YulFunctionDefinition",
            parameters: [
              {
                name: "data",
                nodeType: "YulTypedName",
                src: "42:4:13",
                type: "",
              },
            ],
            returnVariables: [
              {
                name: "length",
                nodeType: "YulTypedName",
                src: "51:6:13",
                type: "",
              },
            ],
            src: "7:320:13",
          },
          {
            body: {
              nodeType: "YulBlock",
              src: "361:152:13",
              statements: [
                {
                  expression: {
                    arguments: [
                      {
                        kind: "number",
                        nodeType: "YulLiteral",
                        src: "378:1:13",
                        type: "",
                        value: "0",
                      },
                      {
                        kind: "number",
                        nodeType: "YulLiteral",
                        src: "381:77:13",
                        type: "",
                        value:
                          "35408467139433450592217433187231851964531694900788300625387963629091585785856",
                      },
                    ],
                    functionName: {
                      name: "mstore",
                      nodeType: "YulIdentifier",
                      src: "371:6:13",
                    },
                    nodeType: "YulFunctionCall",
                    src: "371:88:13",
                  },
                  nodeType: "YulExpressionStatement",
                  src: "371:88:13",
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: "number",
                        nodeType: "YulLiteral",
                        src: "475:1:13",
                        type: "",
                        value: "4",
                      },
                      {
                        kind: "number",
                        nodeType: "YulLiteral",
                        src: "478:4:13",
                        type: "",
                        value: "0x22",
                      },
                    ],
                    functionName: {
                      name: "mstore",
                      nodeType: "YulIdentifier",
                      src: "468:6:13",
                    },
                    nodeType: "YulFunctionCall",
                    src: "468:15:13",
                  },
                  nodeType: "YulExpressionStatement",
                  src: "468:15:13",
                },
                {
                  expression: {
                    arguments: [
                      {
                        kind: "number",
                        nodeType: "YulLiteral",
                        src: "499:1:13",
                        type: "",
                        value: "0",
                      },
                      {
                        kind: "number",
                        nodeType: "YulLiteral",
                        src: "502:4:13",
                        type: "",
                        value: "0x24",
                      },
                    ],
                    functionName: {
                      name: "revert",
                      nodeType: "YulIdentifier",
                      src: "492:6:13",
                    },
                    nodeType: "YulFunctionCall",
                    src: "492:15:13",
                  },
                  nodeType: "YulExpressionStatement",
                  src: "492:15:13",
                },
              ],
            },
            name: "panic_error_0x22",
            nodeType: "YulFunctionDefinition",
            src: "333:180:13",
          },
        ],
      },
      contents:
        "{\n\n    function extract_byte_array_length(data) -> length {\n        length := div(data, 2)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) {\n            length := and(length, 0x7f)\n        }\n\n        if eq(outOfPlaceEncoding, lt(length, 32)) {\n            panic_error_0x22()\n        }\n    }\n\n    function panic_error_0x22() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x22)\n        revert(0, 0x24)\n    }\n\n}\n",
      id: 13,
      language: "Yul",
      name: "#utility.yul",
    },
  ],
  linkReferences: {},
  object:
    "60806040523480156200001157600080fd5b506040518060400160405280600581526020017f5a6c6f74790000000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f504c4e0000000000000000000000000000000000000000000000000000000000815250816000908051906020019062000096929190620001a6565b508060019080519060200190620000af929190620001a6565b505050620000d2620000c6620000d860201b60201c565b620000e060201b60201c565b620002bb565b600033905090565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001b49062000256565b90600052602060002090601f016020900481019282620001d8576000855562000224565b82601f10620001f357805160ff191683800117855562000224565b8280016001018555821562000224579182015b828111156200022357825182559160200191906001019062000206565b5b50905062000233919062000237565b5090565b5b808211156200025257600081600090555060010162000238565b5090565b600060028204905060018216806200026f57607f821691505b602082108114156200028657620002856200028c565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b61301480620002cb6000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c8063715018a6116100a2578063b88d4fde11610071578063b88d4fde146102a4578063c87b56dd146102c0578063d204c45e146102f0578063e985e9c51461030c578063f2fde38b1461033c5761010b565b8063715018a6146102425780638da5cb5b1461024c57806395d89b411461026a578063a22cb465146102885761010b565b806323b872dd116100de57806323b872dd146101aa57806342842e0e146101c65780636352211e146101e257806370a08231146102125761010b565b806301ffc9a71461011057806306fdde0314610140578063081812fc1461015e578063095ea7b31461018e575b600080fd5b61012a60048036038101906101259190611f74565b610358565b60405161013791906123cc565b60405180910390f35b61014861043a565b60405161015591906123e7565b60405180910390f35b61017860048036038101906101739190611fce565b6104cc565b6040516101859190612365565b60405180910390f35b6101a860048036038101906101a39190611f34565b610551565b005b6101c460048036038101906101bf9190611dc2565b610669565b005b6101e060048036038101906101db9190611dc2565b6106c9565b005b6101fc60048036038101906101f79190611fce565b6106e9565b6040516102099190612365565b60405180910390f35b61022c60048036038101906102279190611d55565b61079b565b6040516102399190612649565b60405180910390f35b61024a610853565b005b6102546108db565b6040516102619190612365565b60405180910390f35b610272610905565b60405161027f91906123e7565b60405180910390f35b6102a2600480360381019061029d9190611e98565b610997565b005b6102be60048036038101906102b99190611e15565b6109ad565b005b6102da60048036038101906102d59190611fce565b610a0f565b6040516102e791906123e7565b60405180910390f35b61030a60048036038101906103059190611ed8565b610a21565b005b61032660048036038101906103219190611d82565b610a52565b60405161033391906123cc565b60405180910390f35b61035660048036038101906103519190611d55565b610ae6565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061042357507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610433575061043282610bde565b5b9050919050565b6060600080546104499061289f565b80601f01602080910402602001604051908101604052809291908181526020018280546104759061289f565b80156104c25780601f10610497576101008083540402835291602001916104c2565b820191906000526020600020905b8154815290600101906020018083116104a557829003601f168201915b5050505050905090565b60006104d782610c48565b610516576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050d906125a9565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600061055c826106e9565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156105cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c490612609565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166105ec610cb4565b73ffffffffffffffffffffffffffffffffffffffff16148061061b575061061a81610615610cb4565b610a52565b5b61065a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610651906124e9565b60405180910390fd5b6106648383610cbc565b505050565b61067a610674610cb4565b82610d75565b6106b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106b090612629565b60405180910390fd5b6106c4838383610e53565b505050565b6106e4838383604051806020016040528060008152506109ad565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610792576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078990612529565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561080c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080390612509565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61085b610cb4565b73ffffffffffffffffffffffffffffffffffffffff166108796108db565b73ffffffffffffffffffffffffffffffffffffffff16146108cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c6906125c9565b60405180910390fd5b6108d960006110ba565b565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600180546109149061289f565b80601f01602080910402602001604051908101604052809291908181526020018280546109409061289f565b801561098d5780601f106109625761010080835404028352916020019161098d565b820191906000526020600020905b81548152906001019060200180831161097057829003601f168201915b5050505050905090565b6109a96109a2610cb4565b8383611180565b5050565b6109be6109b8610cb4565b83610d75565b6109fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f490612629565b60405180910390fd5b610a09848484846112ed565b50505050565b6060610a1a82611349565b9050919050565b6000610a2d600861149b565b9050610a3960086114a9565b610a4383826114bf565b610a4d81836114dd565b505050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610aee610cb4565b73ffffffffffffffffffffffffffffffffffffffff16610b0c6108db565b73ffffffffffffffffffffffffffffffffffffffff1614610b62576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b59906125c9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610bd2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bc990612429565b60405180910390fd5b610bdb816110ba565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610d2f836106e9565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610d8082610c48565b610dbf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db6906124c9565b60405180910390fd5b6000610dca836106e9565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610e3957508373ffffffffffffffffffffffffffffffffffffffff16610e21846104cc565b73ffffffffffffffffffffffffffffffffffffffff16145b80610e4a5750610e498185610a52565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610e73826106e9565b73ffffffffffffffffffffffffffffffffffffffff1614610ec9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ec090612449565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610f39576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f3090612489565b60405180910390fd5b610f44838383611551565b610f4f600082610cbc565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f9f91906127b5565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ff6919061272e565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46110b5838383611556565b505050565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156111ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111e6906124a9565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516112e091906123cc565b60405180910390a3505050565b6112f8848484610e53565b6113048484848461155b565b611343576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161133a90612409565b60405180910390fd5b50505050565b606061135482610c48565b611393576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161138a90612589565b60405180910390fd5b60006006600084815260200190815260200160002080546113b39061289f565b80601f01602080910402602001604051908101604052809291908181526020018280546113df9061289f565b801561142c5780601f106114015761010080835404028352916020019161142c565b820191906000526020600020905b81548152906001019060200180831161140f57829003601f168201915b50505050509050600061143d6116f2565b9050600081511415611453578192505050611496565b600082511115611488578082604051602001611470929190612341565b60405160208183030381529060405292505050611496565b61149184611709565b925050505b919050565b600081600001549050919050565b6001816000016000828254019250508190555050565b6114d98282604051806020016040528060008152506117b0565b5050565b6114e682610c48565b611525576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161151c90612549565b60405180910390fd5b8060066000848152602001908152602001600020908051906020019061154c929190611b69565b505050565b505050565b505050565b600061157c8473ffffffffffffffffffffffffffffffffffffffff1661180b565b156116e5578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026115a5610cb4565b8786866040518563ffffffff1660e01b81526004016115c79493929190612380565b602060405180830381600087803b1580156115e157600080fd5b505af192505050801561161257506040513d601f19601f8201168201806040525081019061160f9190611fa1565b60015b611695573d8060008114611642576040519150601f19603f3d011682016040523d82523d6000602084013e611647565b606091505b5060008151141561168d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161168490612409565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150506116ea565b600190505b949350505050565b606060405180602001604052806000815250905090565b606061171482610c48565b611753576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161174a906125e9565b60405180910390fd5b600061175d6116f2565b9050600081511161177d57604051806020016040528060008152506117a8565b806117878461182e565b604051602001611798929190612341565b6040516020818303038152906040525b915050919050565b6117ba838361198f565b6117c7600084848461155b565b611806576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117fd90612409565b60405180910390fd5b505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b60606000821415611876576040518060400160405280600181526020017f3000000000000000000000000000000000000000000000000000000000000000815250905061198a565b600082905060005b600082146118a857808061189190612902565b915050600a826118a19190612784565b915061187e565b60008167ffffffffffffffff8111156118c4576118c3612a38565b5b6040519080825280601f01601f1916602001820160405280156118f65781602001600182028036833780820191505090505b5090505b600085146119835760018261190f91906127b5565b9150600a8561191e919061294b565b603061192a919061272e565b60f81b8183815181106119405761193f612a09565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a8561197c9190612784565b94506118fa565b8093505050505b919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156119ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119f690612569565b60405180910390fd5b611a0881610c48565b15611a48576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a3f90612469565b60405180910390fd5b611a5460008383611551565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611aa4919061272e565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4611b6560008383611556565b5050565b828054611b759061289f565b90600052602060002090601f016020900481019282611b975760008555611bde565b82601f10611bb057805160ff1916838001178555611bde565b82800160010185558215611bde579182015b82811115611bdd578251825591602001919060010190611bc2565b5b509050611beb9190611bef565b5090565b5b80821115611c08576000816000905550600101611bf0565b5090565b6000611c1f611c1a84612689565b612664565b905082815260208101848484011115611c3b57611c3a612a6c565b5b611c4684828561285d565b509392505050565b6000611c61611c5c846126ba565b612664565b905082815260208101848484011115611c7d57611c7c612a6c565b5b611c8884828561285d565b509392505050565b600081359050611c9f81612f82565b92915050565b600081359050611cb481612f99565b92915050565b600081359050611cc981612fb0565b92915050565b600081519050611cde81612fb0565b92915050565b600082601f830112611cf957611cf8612a67565b5b8135611d09848260208601611c0c565b91505092915050565b600082601f830112611d2757611d26612a67565b5b8135611d37848260208601611c4e565b91505092915050565b600081359050611d4f81612fc7565b92915050565b600060208284031215611d6b57611d6a612a76565b5b6000611d7984828501611c90565b91505092915050565b60008060408385031215611d9957611d98612a76565b5b6000611da785828601611c90565b9250506020611db885828601611c90565b9150509250929050565b600080600060608486031215611ddb57611dda612a76565b5b6000611de986828701611c90565b9350506020611dfa86828701611c90565b9250506040611e0b86828701611d40565b9150509250925092565b60008060008060808587031215611e2f57611e2e612a76565b5b6000611e3d87828801611c90565b9450506020611e4e87828801611c90565b9350506040611e5f87828801611d40565b925050606085013567ffffffffffffffff811115611e8057611e7f612a71565b5b611e8c87828801611ce4565b91505092959194509250565b60008060408385031215611eaf57611eae612a76565b5b6000611ebd85828601611c90565b9250506020611ece85828601611ca5565b9150509250929050565b60008060408385031215611eef57611eee612a76565b5b6000611efd85828601611c90565b925050602083013567ffffffffffffffff811115611f1e57611f1d612a71565b5b611f2a85828601611d12565b9150509250929050565b60008060408385031215611f4b57611f4a612a76565b5b6000611f5985828601611c90565b9250506020611f6a85828601611d40565b9150509250929050565b600060208284031215611f8a57611f89612a76565b5b6000611f9884828501611cba565b91505092915050565b600060208284031215611fb757611fb6612a76565b5b6000611fc584828501611ccf565b91505092915050565b600060208284031215611fe457611fe3612a76565b5b6000611ff284828501611d40565b91505092915050565b612004816127e9565b82525050565b612013816127fb565b82525050565b6000612024826126eb565b61202e8185612701565b935061203e81856020860161286c565b61204781612a7b565b840191505092915050565b600061205d826126f6565b6120678185612712565b935061207781856020860161286c565b61208081612a7b565b840191505092915050565b6000612096826126f6565b6120a08185612723565b93506120b081856020860161286c565b80840191505092915050565b60006120c9603283612712565b91506120d482612a8c565b604082019050919050565b60006120ec602683612712565b91506120f782612adb565b604082019050919050565b600061210f602583612712565b915061211a82612b2a565b604082019050919050565b6000612132601c83612712565b915061213d82612b79565b602082019050919050565b6000612155602483612712565b915061216082612ba2565b604082019050919050565b6000612178601983612712565b915061218382612bf1565b602082019050919050565b600061219b602c83612712565b91506121a682612c1a565b604082019050919050565b60006121be603883612712565b91506121c982612c69565b604082019050919050565b60006121e1602a83612712565b91506121ec82612cb8565b604082019050919050565b6000612204602983612712565b915061220f82612d07565b604082019050919050565b6000612227602e83612712565b915061223282612d56565b604082019050919050565b600061224a602083612712565b915061225582612da5565b602082019050919050565b600061226d603183612712565b915061227882612dce565b604082019050919050565b6000612290602c83612712565b915061229b82612e1d565b604082019050919050565b60006122b3602083612712565b91506122be82612e6c565b602082019050919050565b60006122d6602f83612712565b91506122e182612e95565b604082019050919050565b60006122f9602183612712565b915061230482612ee4565b604082019050919050565b600061231c603183612712565b915061232782612f33565b604082019050919050565b61233b81612853565b82525050565b600061234d828561208b565b9150612359828461208b565b91508190509392505050565b600060208201905061237a6000830184611ffb565b92915050565b60006080820190506123956000830187611ffb565b6123a26020830186611ffb565b6123af6040830185612332565b81810360608301526123c18184612019565b905095945050505050565b60006020820190506123e1600083018461200a565b92915050565b600060208201905081810360008301526124018184612052565b905092915050565b60006020820190508181036000830152612422816120bc565b9050919050565b60006020820190508181036000830152612442816120df565b9050919050565b6000602082019050818103600083015261246281612102565b9050919050565b6000602082019050818103600083015261248281612125565b9050919050565b600060208201905081810360008301526124a281612148565b9050919050565b600060208201905081810360008301526124c28161216b565b9050919050565b600060208201905081810360008301526124e28161218e565b9050919050565b60006020820190508181036000830152612502816121b1565b9050919050565b60006020820190508181036000830152612522816121d4565b9050919050565b60006020820190508181036000830152612542816121f7565b9050919050565b600060208201905081810360008301526125628161221a565b9050919050565b600060208201905081810360008301526125828161223d565b9050919050565b600060208201905081810360008301526125a281612260565b9050919050565b600060208201905081810360008301526125c281612283565b9050919050565b600060208201905081810360008301526125e2816122a6565b9050919050565b60006020820190508181036000830152612602816122c9565b9050919050565b60006020820190508181036000830152612622816122ec565b9050919050565b600060208201905081810360008301526126428161230f565b9050919050565b600060208201905061265e6000830184612332565b92915050565b600061266e61267f565b905061267a82826128d1565b919050565b6000604051905090565b600067ffffffffffffffff8211156126a4576126a3612a38565b5b6126ad82612a7b565b9050602081019050919050565b600067ffffffffffffffff8211156126d5576126d4612a38565b5b6126de82612a7b565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b600061273982612853565b915061274483612853565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156127795761277861297c565b5b828201905092915050565b600061278f82612853565b915061279a83612853565b9250826127aa576127a96129ab565b5b828204905092915050565b60006127c082612853565b91506127cb83612853565b9250828210156127de576127dd61297c565b5b828203905092915050565b60006127f482612833565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b8381101561288a57808201518184015260208101905061286f565b83811115612899576000848401525b50505050565b600060028204905060018216806128b757607f821691505b602082108114156128cb576128ca6129da565b5b50919050565b6128da82612a7b565b810181811067ffffffffffffffff821117156128f9576128f8612a38565b5b80604052505050565b600061290d82612853565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156129405761293f61297c565b5b600182019050919050565b600061295682612853565b915061296183612853565b925082612971576129706129ab565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b7f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60008201527f6578697374656e7420746f6b656e000000000000000000000000000000000000602082015250565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b7f45524337323155524953746f726167653a2055524920717565727920666f722060008201527f6e6f6e6578697374656e7420746f6b656e000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b612f8b816127e9565b8114612f9657600080fd5b50565b612fa2816127fb565b8114612fad57600080fd5b50565b612fb981612807565b8114612fc457600080fd5b50565b612fd081612853565b8114612fdb57600080fd5b5056fea264697066735822122052a357e127d73814d7c5425717aa60fff3872cb5815fd9b2c91e330b4ffb8a9564736f6c63430008070033",
  opcodes:
    "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH3 0x11 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x5 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x5A6C6F7479000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x3 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x504C4E0000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP DUP2 PUSH1 0x0 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH3 0x96 SWAP3 SWAP2 SWAP1 PUSH3 0x1A6 JUMP JUMPDEST POP DUP1 PUSH1 0x1 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH3 0xAF SWAP3 SWAP2 SWAP1 PUSH3 0x1A6 JUMP JUMPDEST POP POP POP PUSH3 0xD2 PUSH3 0xC6 PUSH3 0xD8 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST PUSH3 0xE0 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST PUSH3 0x2BB JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x7 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP DUP2 PUSH1 0x7 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH3 0x1B4 SWAP1 PUSH3 0x256 JUMP JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH3 0x1D8 JUMPI PUSH1 0x0 DUP6 SSTORE PUSH3 0x224 JUMP JUMPDEST DUP3 PUSH1 0x1F LT PUSH3 0x1F3 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH3 0x224 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH3 0x224 JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH3 0x223 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH3 0x206 JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH3 0x233 SWAP2 SWAP1 PUSH3 0x237 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH3 0x252 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH3 0x238 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 DUP3 DIV SWAP1 POP PUSH1 0x1 DUP3 AND DUP1 PUSH3 0x26F JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH3 0x286 JUMPI PUSH3 0x285 PUSH3 0x28C JUMP JUMPDEST JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH2 0x3014 DUP1 PUSH3 0x2CB PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x10B JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x715018A6 GT PUSH2 0xA2 JUMPI DUP1 PUSH4 0xB88D4FDE GT PUSH2 0x71 JUMPI DUP1 PUSH4 0xB88D4FDE EQ PUSH2 0x2A4 JUMPI DUP1 PUSH4 0xC87B56DD EQ PUSH2 0x2C0 JUMPI DUP1 PUSH4 0xD204C45E EQ PUSH2 0x2F0 JUMPI DUP1 PUSH4 0xE985E9C5 EQ PUSH2 0x30C JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x33C JUMPI PUSH2 0x10B JUMP JUMPDEST DUP1 PUSH4 0x715018A6 EQ PUSH2 0x242 JUMPI DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x24C JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x26A JUMPI DUP1 PUSH4 0xA22CB465 EQ PUSH2 0x288 JUMPI PUSH2 0x10B JUMP JUMPDEST DUP1 PUSH4 0x23B872DD GT PUSH2 0xDE JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x1AA JUMPI DUP1 PUSH4 0x42842E0E EQ PUSH2 0x1C6 JUMPI DUP1 PUSH4 0x6352211E EQ PUSH2 0x1E2 JUMPI DUP1 PUSH4 0x70A08231 EQ PUSH2 0x212 JUMPI PUSH2 0x10B JUMP JUMPDEST DUP1 PUSH4 0x1FFC9A7 EQ PUSH2 0x110 JUMPI DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0x140 JUMPI DUP1 PUSH4 0x81812FC EQ PUSH2 0x15E JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x18E JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x12A PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x125 SWAP2 SWAP1 PUSH2 0x1F74 JUMP JUMPDEST PUSH2 0x358 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x137 SWAP2 SWAP1 PUSH2 0x23CC JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x148 PUSH2 0x43A JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x155 SWAP2 SWAP1 PUSH2 0x23E7 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x178 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x173 SWAP2 SWAP1 PUSH2 0x1FCE JUMP JUMPDEST PUSH2 0x4CC JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x185 SWAP2 SWAP1 PUSH2 0x2365 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x1A8 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x1A3 SWAP2 SWAP1 PUSH2 0x1F34 JUMP JUMPDEST PUSH2 0x551 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x1C4 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x1BF SWAP2 SWAP1 PUSH2 0x1DC2 JUMP JUMPDEST PUSH2 0x669 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x1E0 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x1DB SWAP2 SWAP1 PUSH2 0x1DC2 JUMP JUMPDEST PUSH2 0x6C9 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x1FC PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x1F7 SWAP2 SWAP1 PUSH2 0x1FCE JUMP JUMPDEST PUSH2 0x6E9 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x209 SWAP2 SWAP1 PUSH2 0x2365 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x22C PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x227 SWAP2 SWAP1 PUSH2 0x1D55 JUMP JUMPDEST PUSH2 0x79B JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x239 SWAP2 SWAP1 PUSH2 0x2649 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x24A PUSH2 0x853 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x254 PUSH2 0x8DB JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x261 SWAP2 SWAP1 PUSH2 0x2365 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x272 PUSH2 0x905 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x27F SWAP2 SWAP1 PUSH2 0x23E7 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x2A2 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x29D SWAP2 SWAP1 PUSH2 0x1E98 JUMP JUMPDEST PUSH2 0x997 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x2BE PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x2B9 SWAP2 SWAP1 PUSH2 0x1E15 JUMP JUMPDEST PUSH2 0x9AD JUMP JUMPDEST STOP JUMPDEST PUSH2 0x2DA PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x2D5 SWAP2 SWAP1 PUSH2 0x1FCE JUMP JUMPDEST PUSH2 0xA0F JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x2E7 SWAP2 SWAP1 PUSH2 0x23E7 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x30A PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x305 SWAP2 SWAP1 PUSH2 0x1ED8 JUMP JUMPDEST PUSH2 0xA21 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x326 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x321 SWAP2 SWAP1 PUSH2 0x1D82 JUMP JUMPDEST PUSH2 0xA52 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x333 SWAP2 SWAP1 PUSH2 0x23CC JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x356 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x351 SWAP2 SWAP1 PUSH2 0x1D55 JUMP JUMPDEST PUSH2 0xAE6 JUMP JUMPDEST STOP JUMPDEST PUSH1 0x0 PUSH32 0x80AC58CD00000000000000000000000000000000000000000000000000000000 PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT AND DUP3 PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT AND EQ DUP1 PUSH2 0x423 JUMPI POP PUSH32 0x5B5E139F00000000000000000000000000000000000000000000000000000000 PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT AND DUP3 PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT AND EQ JUMPDEST DUP1 PUSH2 0x433 JUMPI POP PUSH2 0x432 DUP3 PUSH2 0xBDE JUMP JUMPDEST JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x60 PUSH1 0x0 DUP1 SLOAD PUSH2 0x449 SWAP1 PUSH2 0x289F JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x475 SWAP1 PUSH2 0x289F JUMP JUMPDEST DUP1 ISZERO PUSH2 0x4C2 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x497 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x4C2 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x4A5 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x4D7 DUP3 PUSH2 0xC48 JUMP JUMPDEST PUSH2 0x516 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x50D SWAP1 PUSH2 0x25A9 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x4 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x55C DUP3 PUSH2 0x6E9 JUMP JUMPDEST SWAP1 POP DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x5CD JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x5C4 SWAP1 PUSH2 0x2609 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x5EC PUSH2 0xCB4 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ DUP1 PUSH2 0x61B JUMPI POP PUSH2 0x61A DUP2 PUSH2 0x615 PUSH2 0xCB4 JUMP JUMPDEST PUSH2 0xA52 JUMP JUMPDEST JUMPDEST PUSH2 0x65A JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x651 SWAP1 PUSH2 0x24E9 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x664 DUP4 DUP4 PUSH2 0xCBC JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH2 0x67A PUSH2 0x674 PUSH2 0xCB4 JUMP JUMPDEST DUP3 PUSH2 0xD75 JUMP JUMPDEST PUSH2 0x6B9 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x6B0 SWAP1 PUSH2 0x2629 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x6C4 DUP4 DUP4 DUP4 PUSH2 0xE53 JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH2 0x6E4 DUP4 DUP4 DUP4 PUSH1 0x40 MLOAD DUP1 PUSH1 0x20 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP PUSH2 0x9AD JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x2 PUSH1 0x0 DUP5 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x792 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x789 SWAP1 PUSH2 0x2529 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 SWAP2 POP POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x80C JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x803 SWAP1 PUSH2 0x2509 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x3 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0x85B PUSH2 0xCB4 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x879 PUSH2 0x8DB JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0x8CF JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x8C6 SWAP1 PUSH2 0x25C9 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x8D9 PUSH1 0x0 PUSH2 0x10BA JUMP JUMPDEST JUMP JUMPDEST PUSH1 0x0 PUSH1 0x7 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x60 PUSH1 0x1 DUP1 SLOAD PUSH2 0x914 SWAP1 PUSH2 0x289F JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x940 SWAP1 PUSH2 0x289F JUMP JUMPDEST DUP1 ISZERO PUSH2 0x98D JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x962 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x98D JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x970 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH2 0x9A9 PUSH2 0x9A2 PUSH2 0xCB4 JUMP JUMPDEST DUP4 DUP4 PUSH2 0x1180 JUMP JUMPDEST POP POP JUMP JUMPDEST PUSH2 0x9BE PUSH2 0x9B8 PUSH2 0xCB4 JUMP JUMPDEST DUP4 PUSH2 0xD75 JUMP JUMPDEST PUSH2 0x9FD JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x9F4 SWAP1 PUSH2 0x2629 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0xA09 DUP5 DUP5 DUP5 DUP5 PUSH2 0x12ED JUMP JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x60 PUSH2 0xA1A DUP3 PUSH2 0x1349 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xA2D PUSH1 0x8 PUSH2 0x149B JUMP JUMPDEST SWAP1 POP PUSH2 0xA39 PUSH1 0x8 PUSH2 0x14A9 JUMP JUMPDEST PUSH2 0xA43 DUP4 DUP3 PUSH2 0x14BF JUMP JUMPDEST PUSH2 0xA4D DUP2 DUP4 PUSH2 0x14DD JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x5 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH1 0xFF AND SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0xAEE PUSH2 0xCB4 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0xB0C PUSH2 0x8DB JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0xB62 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xB59 SWAP1 PUSH2 0x25C9 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xBD2 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xBC9 SWAP1 PUSH2 0x2429 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0xBDB DUP2 PUSH2 0x10BA JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 PUSH32 0x1FFC9A700000000000000000000000000000000000000000000000000000000 PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT AND DUP3 PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT AND EQ SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x2 PUSH1 0x0 DUP5 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST DUP2 PUSH1 0x4 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP1 DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0xD2F DUP4 PUSH2 0x6E9 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG4 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0xD80 DUP3 PUSH2 0xC48 JUMP JUMPDEST PUSH2 0xDBF JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xDB6 SWAP1 PUSH2 0x24C9 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH2 0xDCA DUP4 PUSH2 0x6E9 JUMP JUMPDEST SWAP1 POP DUP1 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ DUP1 PUSH2 0xE39 JUMPI POP DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0xE21 DUP5 PUSH2 0x4CC JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ JUMPDEST DUP1 PUSH2 0xE4A JUMPI POP PUSH2 0xE49 DUP2 DUP6 PUSH2 0xA52 JUMP JUMPDEST JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0xE73 DUP3 PUSH2 0x6E9 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0xEC9 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xEC0 SWAP1 PUSH2 0x2449 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xF39 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xF30 SWAP1 PUSH2 0x2489 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0xF44 DUP4 DUP4 DUP4 PUSH2 0x1551 JUMP JUMPDEST PUSH2 0xF4F PUSH1 0x0 DUP3 PUSH2 0xCBC JUMP JUMPDEST PUSH1 0x1 PUSH1 0x3 PUSH1 0x0 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0xF9F SWAP2 SWAP1 PUSH2 0x27B5 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP PUSH1 0x1 PUSH1 0x3 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0xFF6 SWAP2 SWAP1 PUSH2 0x272E JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP2 PUSH1 0x2 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP1 DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG4 PUSH2 0x10B5 DUP4 DUP4 DUP4 PUSH2 0x1556 JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x7 PUSH1 0x0 SWAP1 SLOAD SWAP1 PUSH2 0x100 EXP SWAP1 DIV PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND SWAP1 POP DUP2 PUSH1 0x7 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP JUMP JUMPDEST DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x11EF JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x11E6 SWAP1 PUSH2 0x24A9 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 PUSH1 0x5 PUSH1 0x0 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH1 0xFF MUL NOT AND SWAP1 DUP4 ISZERO ISZERO MUL OR SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x17307EAB39AB6107E8899845AD3D59BD9653F200F220920489CA2B5937696C31 DUP4 PUSH1 0x40 MLOAD PUSH2 0x12E0 SWAP2 SWAP1 PUSH2 0x23CC JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH2 0x12F8 DUP5 DUP5 DUP5 PUSH2 0xE53 JUMP JUMPDEST PUSH2 0x1304 DUP5 DUP5 DUP5 DUP5 PUSH2 0x155B JUMP JUMPDEST PUSH2 0x1343 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x133A SWAP1 PUSH2 0x2409 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x60 PUSH2 0x1354 DUP3 PUSH2 0xC48 JUMP JUMPDEST PUSH2 0x1393 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x138A SWAP1 PUSH2 0x2589 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x6 PUSH1 0x0 DUP5 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP1 SLOAD PUSH2 0x13B3 SWAP1 PUSH2 0x289F JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x13DF SWAP1 PUSH2 0x289F JUMP JUMPDEST DUP1 ISZERO PUSH2 0x142C JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x1401 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x142C JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x140F JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP PUSH1 0x0 PUSH2 0x143D PUSH2 0x16F2 JUMP JUMPDEST SWAP1 POP PUSH1 0x0 DUP2 MLOAD EQ ISZERO PUSH2 0x1453 JUMPI DUP2 SWAP3 POP POP POP PUSH2 0x1496 JUMP JUMPDEST PUSH1 0x0 DUP3 MLOAD GT ISZERO PUSH2 0x1488 JUMPI DUP1 DUP3 PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH2 0x1470 SWAP3 SWAP2 SWAP1 PUSH2 0x2341 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 DUP2 DUP4 SUB SUB DUP2 MSTORE SWAP1 PUSH1 0x40 MSTORE SWAP3 POP POP POP PUSH2 0x1496 JUMP JUMPDEST PUSH2 0x1491 DUP5 PUSH2 0x1709 JUMP JUMPDEST SWAP3 POP POP POP JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 PUSH1 0x0 ADD SLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x1 DUP2 PUSH1 0x0 ADD PUSH1 0x0 DUP3 DUP3 SLOAD ADD SWAP3 POP POP DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH2 0x14D9 DUP3 DUP3 PUSH1 0x40 MLOAD DUP1 PUSH1 0x20 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP PUSH2 0x17B0 JUMP JUMPDEST POP POP JUMP JUMPDEST PUSH2 0x14E6 DUP3 PUSH2 0xC48 JUMP JUMPDEST PUSH2 0x1525 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x151C SWAP1 PUSH2 0x2549 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 PUSH1 0x6 PUSH1 0x0 DUP5 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH2 0x154C SWAP3 SWAP2 SWAP1 PUSH2 0x1B69 JUMP JUMPDEST POP POP POP JUMP JUMPDEST POP POP POP JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x157C DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH2 0x180B JUMP JUMPDEST ISZERO PUSH2 0x16E5 JUMPI DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH4 0x150B7A02 PUSH2 0x15A5 PUSH2 0xCB4 JUMP JUMPDEST DUP8 DUP7 DUP7 PUSH1 0x40 MLOAD DUP6 PUSH4 0xFFFFFFFF AND PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x15C7 SWAP5 SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0x2380 JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x15E1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL SWAP3 POP POP POP DUP1 ISZERO PUSH2 0x1612 JUMPI POP PUSH1 0x40 MLOAD RETURNDATASIZE PUSH1 0x1F NOT PUSH1 0x1F DUP3 ADD AND DUP3 ADD DUP1 PUSH1 0x40 MSTORE POP DUP2 ADD SWAP1 PUSH2 0x160F SWAP2 SWAP1 PUSH2 0x1FA1 JUMP JUMPDEST PUSH1 0x1 JUMPDEST PUSH2 0x1695 JUMPI RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x1642 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x1647 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP PUSH1 0x0 DUP2 MLOAD EQ ISZERO PUSH2 0x168D JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x1684 SWAP1 PUSH2 0x2409 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 MLOAD DUP2 PUSH1 0x20 ADD REVERT JUMPDEST PUSH4 0x150B7A02 PUSH1 0xE0 SHL PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT AND DUP2 PUSH28 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT AND EQ SWAP2 POP POP PUSH2 0x16EA JUMP JUMPDEST PUSH1 0x1 SWAP1 POP JUMPDEST SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST PUSH1 0x60 PUSH1 0x40 MLOAD DUP1 PUSH1 0x20 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x60 PUSH2 0x1714 DUP3 PUSH2 0xC48 JUMP JUMPDEST PUSH2 0x1753 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x174A SWAP1 PUSH2 0x25E9 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH2 0x175D PUSH2 0x16F2 JUMP JUMPDEST SWAP1 POP PUSH1 0x0 DUP2 MLOAD GT PUSH2 0x177D JUMPI PUSH1 0x40 MLOAD DUP1 PUSH1 0x20 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x0 DUP2 MSTORE POP PUSH2 0x17A8 JUMP JUMPDEST DUP1 PUSH2 0x1787 DUP5 PUSH2 0x182E JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH2 0x1798 SWAP3 SWAP2 SWAP1 PUSH2 0x2341 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 DUP2 DUP4 SUB SUB DUP2 MSTORE SWAP1 PUSH1 0x40 MSTORE JUMPDEST SWAP2 POP POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0x17BA DUP4 DUP4 PUSH2 0x198F JUMP JUMPDEST PUSH2 0x17C7 PUSH1 0x0 DUP5 DUP5 DUP5 PUSH2 0x155B JUMP JUMPDEST PUSH2 0x1806 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x17FD SWAP1 PUSH2 0x2409 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EXTCODESIZE GT SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x60 PUSH1 0x0 DUP3 EQ ISZERO PUSH2 0x1876 JUMPI PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x1 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x3000000000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP SWAP1 POP PUSH2 0x198A JUMP JUMPDEST PUSH1 0x0 DUP3 SWAP1 POP PUSH1 0x0 JUMPDEST PUSH1 0x0 DUP3 EQ PUSH2 0x18A8 JUMPI DUP1 DUP1 PUSH2 0x1891 SWAP1 PUSH2 0x2902 JUMP JUMPDEST SWAP2 POP POP PUSH1 0xA DUP3 PUSH2 0x18A1 SWAP2 SWAP1 PUSH2 0x2784 JUMP JUMPDEST SWAP2 POP PUSH2 0x187E JUMP JUMPDEST PUSH1 0x0 DUP2 PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0x18C4 JUMPI PUSH2 0x18C3 PUSH2 0x2A38 JUMP JUMPDEST JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP1 DUP3 MSTORE DUP1 PUSH1 0x1F ADD PUSH1 0x1F NOT AND PUSH1 0x20 ADD DUP3 ADD PUSH1 0x40 MSTORE DUP1 ISZERO PUSH2 0x18F6 JUMPI DUP2 PUSH1 0x20 ADD PUSH1 0x1 DUP3 MUL DUP1 CALLDATASIZE DUP4 CALLDATACOPY DUP1 DUP3 ADD SWAP2 POP POP SWAP1 POP JUMPDEST POP SWAP1 POP JUMPDEST PUSH1 0x0 DUP6 EQ PUSH2 0x1983 JUMPI PUSH1 0x1 DUP3 PUSH2 0x190F SWAP2 SWAP1 PUSH2 0x27B5 JUMP JUMPDEST SWAP2 POP PUSH1 0xA DUP6 PUSH2 0x191E SWAP2 SWAP1 PUSH2 0x294B JUMP JUMPDEST PUSH1 0x30 PUSH2 0x192A SWAP2 SWAP1 PUSH2 0x272E JUMP JUMPDEST PUSH1 0xF8 SHL DUP2 DUP4 DUP2 MLOAD DUP2 LT PUSH2 0x1940 JUMPI PUSH2 0x193F PUSH2 0x2A09 JUMP JUMPDEST JUMPDEST PUSH1 0x20 ADD ADD SWAP1 PUSH31 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF NOT AND SWAP1 DUP2 PUSH1 0x0 BYTE SWAP1 MSTORE8 POP PUSH1 0xA DUP6 PUSH2 0x197C SWAP2 SWAP1 PUSH2 0x2784 JUMP JUMPDEST SWAP5 POP PUSH2 0x18FA JUMP JUMPDEST DUP1 SWAP4 POP POP POP POP JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x19FF JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x19F6 SWAP1 PUSH2 0x2569 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x1A08 DUP2 PUSH2 0xC48 JUMP JUMPDEST ISZERO PUSH2 0x1A48 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x1A3F SWAP1 PUSH2 0x2469 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x1A54 PUSH1 0x0 DUP4 DUP4 PUSH2 0x1551 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x3 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x1AA4 SWAP2 SWAP1 PUSH2 0x272E JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP2 PUSH1 0x2 PUSH1 0x0 DUP4 DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 PUSH2 0x100 EXP DUP2 SLOAD DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF MUL NOT AND SWAP1 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND MUL OR SWAP1 SSTORE POP DUP1 DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF PUSH1 0x40 MLOAD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG4 PUSH2 0x1B65 PUSH1 0x0 DUP4 DUP4 PUSH2 0x1556 JUMP JUMPDEST POP POP JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH2 0x1B75 SWAP1 PUSH2 0x289F JUMP JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH2 0x1B97 JUMPI PUSH1 0x0 DUP6 SSTORE PUSH2 0x1BDE JUMP JUMPDEST DUP3 PUSH1 0x1F LT PUSH2 0x1BB0 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH2 0x1BDE JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH2 0x1BDE JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH2 0x1BDD JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH2 0x1BC2 JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH2 0x1BEB SWAP2 SWAP1 PUSH2 0x1BEF JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH2 0x1C08 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH2 0x1BF0 JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1C1F PUSH2 0x1C1A DUP5 PUSH2 0x2689 JUMP JUMPDEST PUSH2 0x2664 JUMP JUMPDEST SWAP1 POP DUP3 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP5 DUP5 DUP5 ADD GT ISZERO PUSH2 0x1C3B JUMPI PUSH2 0x1C3A PUSH2 0x2A6C JUMP JUMPDEST JUMPDEST PUSH2 0x1C46 DUP5 DUP3 DUP6 PUSH2 0x285D JUMP JUMPDEST POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1C61 PUSH2 0x1C5C DUP5 PUSH2 0x26BA JUMP JUMPDEST PUSH2 0x2664 JUMP JUMPDEST SWAP1 POP DUP3 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP5 DUP5 DUP5 ADD GT ISZERO PUSH2 0x1C7D JUMPI PUSH2 0x1C7C PUSH2 0x2A6C JUMP JUMPDEST JUMPDEST PUSH2 0x1C88 DUP5 DUP3 DUP6 PUSH2 0x285D JUMP JUMPDEST POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x1C9F DUP2 PUSH2 0x2F82 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x1CB4 DUP2 PUSH2 0x2F99 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x1CC9 DUP2 PUSH2 0x2FB0 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP PUSH2 0x1CDE DUP2 PUSH2 0x2FB0 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH1 0x1F DUP4 ADD SLT PUSH2 0x1CF9 JUMPI PUSH2 0x1CF8 PUSH2 0x2A67 JUMP JUMPDEST JUMPDEST DUP2 CALLDATALOAD PUSH2 0x1D09 DUP5 DUP3 PUSH1 0x20 DUP7 ADD PUSH2 0x1C0C JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH1 0x1F DUP4 ADD SLT PUSH2 0x1D27 JUMPI PUSH2 0x1D26 PUSH2 0x2A67 JUMP JUMPDEST JUMPDEST DUP2 CALLDATALOAD PUSH2 0x1D37 DUP5 DUP3 PUSH1 0x20 DUP7 ADD PUSH2 0x1C4E JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x1D4F DUP2 PUSH2 0x2FC7 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x1D6B JUMPI PUSH2 0x1D6A PUSH2 0x2A76 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1D79 DUP5 DUP3 DUP6 ADD PUSH2 0x1C90 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x1D99 JUMPI PUSH2 0x1D98 PUSH2 0x2A76 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1DA7 DUP6 DUP3 DUP7 ADD PUSH2 0x1C90 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x20 PUSH2 0x1DB8 DUP6 DUP3 DUP7 ADD PUSH2 0x1C90 JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x60 DUP5 DUP7 SUB SLT ISZERO PUSH2 0x1DDB JUMPI PUSH2 0x1DDA PUSH2 0x2A76 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1DE9 DUP7 DUP3 DUP8 ADD PUSH2 0x1C90 JUMP JUMPDEST SWAP4 POP POP PUSH1 0x20 PUSH2 0x1DFA DUP7 DUP3 DUP8 ADD PUSH2 0x1C90 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x40 PUSH2 0x1E0B DUP7 DUP3 DUP8 ADD PUSH2 0x1D40 JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 POP SWAP3 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP1 PUSH1 0x80 DUP6 DUP8 SUB SLT ISZERO PUSH2 0x1E2F JUMPI PUSH2 0x1E2E PUSH2 0x2A76 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1E3D DUP8 DUP3 DUP9 ADD PUSH2 0x1C90 JUMP JUMPDEST SWAP5 POP POP PUSH1 0x20 PUSH2 0x1E4E DUP8 DUP3 DUP9 ADD PUSH2 0x1C90 JUMP JUMPDEST SWAP4 POP POP PUSH1 0x40 PUSH2 0x1E5F DUP8 DUP3 DUP9 ADD PUSH2 0x1D40 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x60 DUP6 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0x1E80 JUMPI PUSH2 0x1E7F PUSH2 0x2A71 JUMP JUMPDEST JUMPDEST PUSH2 0x1E8C DUP8 DUP3 DUP9 ADD PUSH2 0x1CE4 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP6 SWAP2 SWAP5 POP SWAP3 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x1EAF JUMPI PUSH2 0x1EAE PUSH2 0x2A76 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1EBD DUP6 DUP3 DUP7 ADD PUSH2 0x1C90 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x20 PUSH2 0x1ECE DUP6 DUP3 DUP7 ADD PUSH2 0x1CA5 JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x1EEF JUMPI PUSH2 0x1EEE PUSH2 0x2A76 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1EFD DUP6 DUP3 DUP7 ADD PUSH2 0x1C90 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x20 DUP4 ADD CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0x1F1E JUMPI PUSH2 0x1F1D PUSH2 0x2A71 JUMP JUMPDEST JUMPDEST PUSH2 0x1F2A DUP6 DUP3 DUP7 ADD PUSH2 0x1D12 JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x1F4B JUMPI PUSH2 0x1F4A PUSH2 0x2A76 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1F59 DUP6 DUP3 DUP7 ADD PUSH2 0x1C90 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x20 PUSH2 0x1F6A DUP6 DUP3 DUP7 ADD PUSH2 0x1D40 JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x1F8A JUMPI PUSH2 0x1F89 PUSH2 0x2A76 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1F98 DUP5 DUP3 DUP6 ADD PUSH2 0x1CBA JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x1FB7 JUMPI PUSH2 0x1FB6 PUSH2 0x2A76 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1FC5 DUP5 DUP3 DUP6 ADD PUSH2 0x1CCF JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x1FE4 JUMPI PUSH2 0x1FE3 PUSH2 0x2A76 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1FF2 DUP5 DUP3 DUP6 ADD PUSH2 0x1D40 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0x2004 DUP2 PUSH2 0x27E9 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH2 0x2013 DUP2 PUSH2 0x27FB JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2024 DUP3 PUSH2 0x26EB JUMP JUMPDEST PUSH2 0x202E DUP2 DUP6 PUSH2 0x2701 JUMP JUMPDEST SWAP4 POP PUSH2 0x203E DUP2 DUP6 PUSH1 0x20 DUP7 ADD PUSH2 0x286C JUMP JUMPDEST PUSH2 0x2047 DUP2 PUSH2 0x2A7B JUMP JUMPDEST DUP5 ADD SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x205D DUP3 PUSH2 0x26F6 JUMP JUMPDEST PUSH2 0x2067 DUP2 DUP6 PUSH2 0x2712 JUMP JUMPDEST SWAP4 POP PUSH2 0x2077 DUP2 DUP6 PUSH1 0x20 DUP7 ADD PUSH2 0x286C JUMP JUMPDEST PUSH2 0x2080 DUP2 PUSH2 0x2A7B JUMP JUMPDEST DUP5 ADD SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2096 DUP3 PUSH2 0x26F6 JUMP JUMPDEST PUSH2 0x20A0 DUP2 DUP6 PUSH2 0x2723 JUMP JUMPDEST SWAP4 POP PUSH2 0x20B0 DUP2 DUP6 PUSH1 0x20 DUP7 ADD PUSH2 0x286C JUMP JUMPDEST DUP1 DUP5 ADD SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x20C9 PUSH1 0x32 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x20D4 DUP3 PUSH2 0x2A8C JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x20EC PUSH1 0x26 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x20F7 DUP3 PUSH2 0x2ADB JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x210F PUSH1 0x25 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x211A DUP3 PUSH2 0x2B2A JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2132 PUSH1 0x1C DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x213D DUP3 PUSH2 0x2B79 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2155 PUSH1 0x24 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x2160 DUP3 PUSH2 0x2BA2 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2178 PUSH1 0x19 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x2183 DUP3 PUSH2 0x2BF1 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x219B PUSH1 0x2C DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x21A6 DUP3 PUSH2 0x2C1A JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x21BE PUSH1 0x38 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x21C9 DUP3 PUSH2 0x2C69 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x21E1 PUSH1 0x2A DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x21EC DUP3 PUSH2 0x2CB8 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2204 PUSH1 0x29 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x220F DUP3 PUSH2 0x2D07 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2227 PUSH1 0x2E DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x2232 DUP3 PUSH2 0x2D56 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x224A PUSH1 0x20 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x2255 DUP3 PUSH2 0x2DA5 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x226D PUSH1 0x31 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x2278 DUP3 PUSH2 0x2DCE JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2290 PUSH1 0x2C DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x229B DUP3 PUSH2 0x2E1D JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x22B3 PUSH1 0x20 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x22BE DUP3 PUSH2 0x2E6C JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x22D6 PUSH1 0x2F DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x22E1 DUP3 PUSH2 0x2E95 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x22F9 PUSH1 0x21 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x2304 DUP3 PUSH2 0x2EE4 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x231C PUSH1 0x31 DUP4 PUSH2 0x2712 JUMP JUMPDEST SWAP2 POP PUSH2 0x2327 DUP3 PUSH2 0x2F33 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0x233B DUP2 PUSH2 0x2853 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x234D DUP3 DUP6 PUSH2 0x208B JUMP JUMPDEST SWAP2 POP PUSH2 0x2359 DUP3 DUP5 PUSH2 0x208B JUMP JUMPDEST SWAP2 POP DUP2 SWAP1 POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x237A PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x1FFB JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x80 DUP3 ADD SWAP1 POP PUSH2 0x2395 PUSH1 0x0 DUP4 ADD DUP8 PUSH2 0x1FFB JUMP JUMPDEST PUSH2 0x23A2 PUSH1 0x20 DUP4 ADD DUP7 PUSH2 0x1FFB JUMP JUMPDEST PUSH2 0x23AF PUSH1 0x40 DUP4 ADD DUP6 PUSH2 0x2332 JUMP JUMPDEST DUP2 DUP2 SUB PUSH1 0x60 DUP4 ADD MSTORE PUSH2 0x23C1 DUP2 DUP5 PUSH2 0x2019 JUMP JUMPDEST SWAP1 POP SWAP6 SWAP5 POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x23E1 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x200A JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2401 DUP2 DUP5 PUSH2 0x2052 JUMP JUMPDEST SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2422 DUP2 PUSH2 0x20BC JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2442 DUP2 PUSH2 0x20DF JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2462 DUP2 PUSH2 0x2102 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2482 DUP2 PUSH2 0x2125 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x24A2 DUP2 PUSH2 0x2148 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x24C2 DUP2 PUSH2 0x216B JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x24E2 DUP2 PUSH2 0x218E JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2502 DUP2 PUSH2 0x21B1 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2522 DUP2 PUSH2 0x21D4 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2542 DUP2 PUSH2 0x21F7 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2562 DUP2 PUSH2 0x221A JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2582 DUP2 PUSH2 0x223D JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x25A2 DUP2 PUSH2 0x2260 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x25C2 DUP2 PUSH2 0x2283 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x25E2 DUP2 PUSH2 0x22A6 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2602 DUP2 PUSH2 0x22C9 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2622 DUP2 PUSH2 0x22EC JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x2642 DUP2 PUSH2 0x230F JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x265E PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x2332 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x266E PUSH2 0x267F JUMP JUMPDEST SWAP1 POP PUSH2 0x267A DUP3 DUP3 PUSH2 0x28D1 JUMP JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x40 MLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT ISZERO PUSH2 0x26A4 JUMPI PUSH2 0x26A3 PUSH2 0x2A38 JUMP JUMPDEST JUMPDEST PUSH2 0x26AD DUP3 PUSH2 0x2A7B JUMP JUMPDEST SWAP1 POP PUSH1 0x20 DUP2 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT ISZERO PUSH2 0x26D5 JUMPI PUSH2 0x26D4 PUSH2 0x2A38 JUMP JUMPDEST JUMPDEST PUSH2 0x26DE DUP3 PUSH2 0x2A7B JUMP JUMPDEST SWAP1 POP PUSH1 0x20 DUP2 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2739 DUP3 PUSH2 0x2853 JUMP JUMPDEST SWAP2 POP PUSH2 0x2744 DUP4 PUSH2 0x2853 JUMP JUMPDEST SWAP3 POP DUP3 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SUB DUP3 GT ISZERO PUSH2 0x2779 JUMPI PUSH2 0x2778 PUSH2 0x297C JUMP JUMPDEST JUMPDEST DUP3 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x278F DUP3 PUSH2 0x2853 JUMP JUMPDEST SWAP2 POP PUSH2 0x279A DUP4 PUSH2 0x2853 JUMP JUMPDEST SWAP3 POP DUP3 PUSH2 0x27AA JUMPI PUSH2 0x27A9 PUSH2 0x29AB JUMP JUMPDEST JUMPDEST DUP3 DUP3 DIV SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x27C0 DUP3 PUSH2 0x2853 JUMP JUMPDEST SWAP2 POP PUSH2 0x27CB DUP4 PUSH2 0x2853 JUMP JUMPDEST SWAP3 POP DUP3 DUP3 LT ISZERO PUSH2 0x27DE JUMPI PUSH2 0x27DD PUSH2 0x297C JUMP JUMPDEST JUMPDEST DUP3 DUP3 SUB SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x27F4 DUP3 PUSH2 0x2833 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 ISZERO ISZERO SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH32 0xFFFFFFFF00000000000000000000000000000000000000000000000000000000 DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST DUP3 DUP2 DUP4 CALLDATACOPY PUSH1 0x0 DUP4 DUP4 ADD MSTORE POP POP POP JUMP JUMPDEST PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x288A JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x286F JUMP JUMPDEST DUP4 DUP2 GT ISZERO PUSH2 0x2899 JUMPI PUSH1 0x0 DUP5 DUP5 ADD MSTORE JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 DUP3 DIV SWAP1 POP PUSH1 0x1 DUP3 AND DUP1 PUSH2 0x28B7 JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH2 0x28CB JUMPI PUSH2 0x28CA PUSH2 0x29DA JUMP JUMPDEST JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0x28DA DUP3 PUSH2 0x2A7B JUMP JUMPDEST DUP2 ADD DUP2 DUP2 LT PUSH8 0xFFFFFFFFFFFFFFFF DUP3 GT OR ISZERO PUSH2 0x28F9 JUMPI PUSH2 0x28F8 PUSH2 0x2A38 JUMP JUMPDEST JUMPDEST DUP1 PUSH1 0x40 MSTORE POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x290D DUP3 PUSH2 0x2853 JUMP JUMPDEST SWAP2 POP PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 EQ ISZERO PUSH2 0x2940 JUMPI PUSH2 0x293F PUSH2 0x297C JUMP JUMPDEST JUMPDEST PUSH1 0x1 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2956 DUP3 PUSH2 0x2853 JUMP JUMPDEST SWAP2 POP PUSH2 0x2961 DUP4 PUSH2 0x2853 JUMP JUMPDEST SWAP3 POP DUP3 PUSH2 0x2971 JUMPI PUSH2 0x2970 PUSH2 0x29AB JUMP JUMPDEST JUMPDEST DUP3 DUP3 MOD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x32 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4552433732313A207472616E7366657220746F206E6F6E204552433732315265 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x63656976657220696D706C656D656E7465720000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4F776E61626C653A206E6577206F776E657220697320746865207A65726F2061 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6464726573730000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A207472616E736665722066726F6D20696E636F727265637420 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6F776E6572000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A20746F6B656E20616C7265616479206D696E74656400000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A207472616E7366657220746F20746865207A65726F20616464 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x7265737300000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A20617070726F766520746F2063616C6C657200000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A206F70657261746F7220717565727920666F72206E6F6E6578 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x697374656E7420746F6B656E0000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A20617070726F76652063616C6C6572206973206E6F74206F77 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6E6572206E6F7220617070726F76656420666F7220616C6C0000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A2062616C616E636520717565727920666F7220746865207A65 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x726F206164647265737300000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A206F776E657220717565727920666F72206E6F6E6578697374 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x656E7420746F6B656E0000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524337323155524953746F726167653A2055524920736574206F66206E6F6E PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6578697374656E7420746F6B656E000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A206D696E7420746F20746865207A65726F2061646472657373 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524337323155524953746F726167653A2055524920717565727920666F7220 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6E6F6E6578697374656E7420746F6B656E000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A20617070726F76656420717565727920666F72206E6F6E6578 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x697374656E7420746F6B656E0000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4F776E61626C653A2063616C6C6572206973206E6F7420746865206F776E6572 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732314D657461646174613A2055524920717565727920666F72206E6F PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6E6578697374656E7420746F6B656E0000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A20617070726F76616C20746F2063757272656E74206F776E65 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x7200000000000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x4552433732313A207472616E736665722063616C6C6572206973206E6F74206F PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x776E6572206E6F7220617070726F766564000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH2 0x2F8B DUP2 PUSH2 0x27E9 JUMP JUMPDEST DUP2 EQ PUSH2 0x2F96 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH2 0x2FA2 DUP2 PUSH2 0x27FB JUMP JUMPDEST DUP2 EQ PUSH2 0x2FAD JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH2 0x2FB9 DUP2 PUSH2 0x2807 JUMP JUMPDEST DUP2 EQ PUSH2 0x2FC4 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH2 0x2FD0 DUP2 PUSH2 0x2853 JUMP JUMPDEST DUP2 EQ PUSH2 0x2FDB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 MSTORE LOG3 JUMPI 0xE1 0x27 0xD7 CODESIZE EQ 0xD7 0xC5 TIMESTAMP JUMPI OR 0xAA PUSH1 0xFF RETURN DUP8 0x2C 0xB5 DUP2 0x5F 0xD9 0xB2 0xC9 0x1E CALLER SIGNEXTEND 0x4F 0xFB DUP11 SWAP6 PUSH5 0x736F6C6343 STOP ADDMOD SMOD STOP CALLER ",
  sourceMap:
    "325:797:12:-:0;;;472:39;;;;;;;;;;1390:113:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1464:5;1456;:13;;;;;;;;;;;;:::i;:::-;;1489:7;1479;:17;;;;;;;;;;;;:::i;:::-;;1390:113;;921:32:0;940:12;:10;;;:12;;:::i;:::-;921:18;;;:32;;:::i;:::-;325:797:12;;640:96:7;693:7;719:10;712:17;;640:96;:::o;2270:187:0:-;2343:16;2362:6;;;;;;;;;;;2343:25;;2387:8;2378:6;;:17;;;;;;;;;;;;;;;;;;2441:8;2410:40;;2431:8;2410:40;;;;;;;;;;;;2333:124;2270:187;:::o;325:797:12:-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;7:320:13:-;51:6;88:1;82:4;78:12;68:22;;135:1;129:4;125:12;156:18;146:81;;212:4;204:6;200:17;190:27;;146:81;274:2;266:6;263:14;243:18;240:38;237:84;;;293:18;;:::i;:::-;237:84;58:269;7:320;;;:::o;333:180::-;381:77;378:1;371:88;478:4;475:1;468:15;502:4;499:1;492:15;325:797:12;;;;;;;",
};

const metadataUri = `{
  name: "Three speheres2",
  description: "Just Three speheres1",
  image:
    "https://lootcloudstorage.blob.core.windows.net/lootcloudteststrgcontainer/hf-678e4045-7815-4b2a-a2bf-82d43736c63a%2Fhf-04b773ea-6e92-44ad-8aa2-928ba50ecd4f_threespheres.jpg",
  threeDimensionalVersion: "0.2",
  gltfFiles: [
    "https://lootcloudstorage.blob.core.windows.net/lootcloudteststrgcontainer/hf-924c8314-3f1f-4bfc-adbe-50924f1ba96d%2Fhf-a04301ac-d2bf-46cd-b029-88a1ce671d29_threespheres.gltf",
  ],
  placement: "wall",
}`;

const mintToAddress = "0x1f2020E04C881aa7fF155b78900f07CfFe7f4Aa6";

const setupWeb3 = async () => {
  //https://stackoverflow.com/cuestions/48735118/usin-~web3-from.metamask-in~react
  // Modern DApp Browsers
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    const hexadecimalContractBytecode = byteCode;

    try {
      window.ethereum.enable().then(function () {
        // User has allowed account access to DApp...
      });
    } catch (c) {
      // User has denied account access to DApp...
      alert(c);
    }
  } else if (window.web3) {
    // Legacy DApp Browsers
    web3 = new Web3(window.web3.currentProvider);
  } else {
    // Non—DApp Browsers
    alert("You have to install MetaMask !");
  }
};

class App extends Component {
  // variable for contract and for storing etherAmount with which we are working
  nftContract;

  constructor() {
    // calling parent component contructor(should be called before using 'this')
    super();

    // setup web3 and provider
    setupWeb3();

    // deploying a contract
    this.nftContract = new web3.eth.Contract(
      contractJsonInterface,
      contractAddress
    );
  }

  safeMint = () => {
    const mintPromise = this.nftContract.methods
      .safeMint(mintToAddress, metadataUri)
      .send({ from: mintToAddress });
  };

  render() {
    return <button onClick={this.safeMint}>Mint the NFT</button>;
  }
}

export default App;
