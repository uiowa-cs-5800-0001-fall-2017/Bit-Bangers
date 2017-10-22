/**
 * @fileoverview Generating JavaScript for game blocks.
 */
'use strict';

goog.provide('Blockly.JavaScript.game');
goog.require('Blockly.JavaScript');

/* discrepancies from working compressed js commented below */

/* Blockly.JavaScript.move_character = function(block) { */
Blockly.JavaScript['move_character'] = function(block) {
  // Move character
  
  var numBlocks = block.getFieldValue('NUM_BLOCKS');
  var direction = block.getFieldValue('DIRECTION');
  
  /* var code = 'alert("should move character ' + numBlocks + ' blocks to the ' + direction + '");'; */
  
  var code = "moveCharacter" + (direction == "LEFT" ? "Left" : "Right") + "(" + numBlocks + ");";
  
  /* return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]; */
  return code;
};
