import * as _ from 'lodash'


/*
 {
    "slot":"steps[0].logs",
    "payload":"icHPPn3xlfyueeoFWF5vbENgyDstzAZ5",
    "action":"e"
 }
  */
export function messagesToObjectUpdate(targetObject, messageObject) {
  const valueType = getTypeOfSlot(targetObject, messageObject.slot)


  if (valueType === 'array') return pushToArraySlot(targetObject, messageObject)

  return pushToStringSlot(targetObject, messageObject)
}


function getTypeOfSlot(targetObject, slot) {
  const value = _.get(targetObject, slot)

  if (value instanceof Array) return 'array'

  return typeof value
}


function pushToArraySlot(targetObject, messageObject) {
  if (messageObject.action === 'r') {
    return _.set(targetObject, messageObject.slot, messageObject.payload)
  }


  const value = _.get(targetObject, messageObject.slot)

  if (messageObject.action === 's') value.unshift(messageObject.payload)

  if (messageObject.action === 'e') value.push(messageObject.payload)


  return _.set(targetObject, messageObject.slot, value)
}

function pushToStringSlot(targetObject, messageObject) {
  if (messageObject.action === 'r') {
    return _.set(targetObject, messageObject.slot, messageObject.payload)
  }


  const value = _.get(targetObject, messageObject.slot)

  if (messageObject.action === 's') _.set(targetObject, messageObject.slot, value + messageObject.payload)

  if (messageObject.action === 'e') _.set(targetObject, messageObject.slot, messageObject.payload + value)


  return _.set(targetObject, messageObject.slot, value)
}
