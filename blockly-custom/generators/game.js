/**
 * @fileoverview Generating JavaScript for game blocks.
 */
'use strict';

goog.provide('Blockly.JavaScript.game');
goog.require('Blockly.JavaScript');

/* discrepancies from working compressed js commented below */

/* Blockly.JavaScript.move_character = function(block) { */
Blockly.JavaScript['move_character'] = function(block,player) {
  // Move character
  
  var numBlocks = block.getFieldValue('NUM_BLOCKS');
  var direction = block.getFieldValue('DIRECTION');
 
  /* var code = 'alert("should move character ' + numBlocks + ' blocks to the ' + direction + '");'; */
  var code = "\nmoveCharacter" + (direction == "LEFT" ? "Left" : "Right") + "(" + numBlocks + ");\n"
   //return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]; 
  return code;
};

/* Blockly.JavaScript.move_character = function(block) { */
Blockly.JavaScript['character_jump'] = function(block,player) {
  // Make Characker jump in a direction
  
  var direction = block.getFieldValue('DIRECTION');
 
  
  var code ="characterJump" + (direction == "LEFT" ? "Left" : "Right") + "();  "
   //return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]; 
  return code;
};

/* Blockly.JavaScript.move_gate = function(block) { */
Blockly.JavaScript['move_gate'] = function(block,gate) {
  // Move character
  
  var numBlocks = block.getFieldValue('NUM_BLOCKS');
  var direction = block.getFieldValue('DIRECTION');
 
  /* var code = 'alert("should move character ' + numBlocks + ' blocks to the ' + direction + '");'; */
  var code = "\nmoveGate" + (direction == "DOWN" ? "Down" : "Up") + "(" + numBlocks + ");\n"
   //return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]; 
  return code;
};
/* Blockly.JavaScript.move_platform_vertical = function(block) { */
Blockly.JavaScript['move_platform_vertical'] = function(block,platform) {
  // Move character
  
  var numBlocks = block.getFieldValue('NUM_BLOCKS');
  var direction = block.getFieldValue('DIRECTION');
 
  /* var code = 'alert("should move character ' + numBlocks + ' blocks to the ' + direction + '");'; */
  var code = "\nmovePlatformVertical" + (direction == "DOWN" ? "Down" : "Up" ) + "(" + numBlocks + ");\n"
   //return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]; 
  return code;
};

/* Blockly.JavaScript.move_platform_horizontal = function(block) { */
Blockly.JavaScript['move_platform_horizontal'] = function(block,platform) {
  // Move character
  
  var numBlocks = block.getFieldValue('NUM_BLOCKS');
  var direction = block.getFieldValue('DIRECTION');
 
  /* var code = 'alert("should move character ' + numBlocks + ' blocks to the ' + direction + '");'; */
  var code = "\nmovePlatformHorizontal" + (direction == "LEFT" ? "Left" : "Right" ) + "(" + numBlocks + ");\n"
   //return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]; 
  return code;
};

Blockly.JavaScript['repeat'] = function(block) {
  // Repeat n times.
  if (block.getField('TIMES')) {
    // Internal number.
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    // External number.
    var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  }
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
  var code = '';
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName(
      'count', Blockly.Variables.NAME_TYPE);
  var endVar = repeats;
  if (!repeats.match(/^\w+$/) && !Blockly.isNumber(repeats)) {
    var endVar = Blockly.JavaScript.variableDB_.getDistinctName(
        'repeat_end', Blockly.Variables.NAME_TYPE);
    code += 'var ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (var ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n'+ branch + '}\n'
      
  return code;
};