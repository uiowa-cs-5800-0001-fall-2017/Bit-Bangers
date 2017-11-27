/**
 * This file contains definitions for custom blocks used to interact
 * with the Phaser game engine.
 */

/**
 * @fileoverview Game engine blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

// goog.provide('Blockly.Blocks.colour');  // Deprecated
// goog.provide('Blockly.Constants.Colour');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/* Reference data from color blocks */

/**
 * Common HSV hue for all blocks in this category.
 * This should be the same as Blockly.Msg.COLOUR_HUE.
 * @readonly
 */
// Blockly.Constants.Colour.HUE = 20;
/** @deprecated Use Blockly.Constants.Colour.HUE */
// Blockly.Blocks.colour.HUE = Blockly.Constants.Colour.HUE;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for movement.
  {
    "type": "move_character",
    "message0": "move character %1 blocks %2",
    "args0": [
      {
        "type": "field_number",
        "name": "NUM_BLOCKS",
        "value": 10
      },
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          [ "right", "RIGHT" ],
          [ "left", "LEFT" ]
        ]
      }
    ],
    "tooltip": "moves character",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120
  },
   // Block for jumping.
  {
    "type": "character_jump",
    "message0": "make character jump to the %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          [ "right", "RIGHT" ],
          [ "left", "LEFT" ]
        ]
      }
    ],
    "tooltip": "makes character jump",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120
  },
  // The 'controls_repeat_ext' block is preferred as it is more flexible.
  {
    "type": "repeat",
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "field_number",
      "name": "TIMES",
      "value": 10,
      "min": 0,
      "precision": 1
    }],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOOPS_HUE}",
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
  }
  
  
]);  // END JSON EXTRACT (Do not delete this comment.)
