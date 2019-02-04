import * as _ from 'lodash'


export function messagesToObjectUpdate(targetObject, messageObject) {
  const valueType = getTypeOfSlot(targetObject, messageObject.slot)


  if (messageObject.slot.endsWith(']')) {
    return
  }

  if (valueType === 'array') {
    pushToArraySlot(targetObject, messageObject)

    return
  }

  pushToPrimitiveSlot(targetObject, messageObject)
}


function getTypeOfSlot(targetObject, slot) {
  const value = _.get(targetObject, slot)

  if (value instanceof Array) return 'array'


  return typeof value
}


function pushToArraySlot(targetObject, messageObject) {
  if (messageObject.action === 'r') {
    _.set(targetObject, messageObject.slot, messageObject.payload)
    return;
  }


  const value = _.get(targetObject, messageObject.slot)


  if (messageObject.action === 's') {
    value.unshift(messageObject.payload)
    return
  }

  if (messageObject.action === 'e') {
    value.push(messageObject.payload)
  }

  return _.set(targetObject, messageObject.slot, value)
}


function pushToPrimitiveSlot(targetObject, messageObject) {
  if (messageObject.action === 'r') return _.set(targetObject, messageObject.slot, messageObject.payload)

  const value = _.get(targetObject, messageObject.slot)


  if (!value) return _.set(targetObject, messageObject.slot, messageObject.payload)

  if (messageObject.action === 's') _.set(targetObject, messageObject.slot, value + messageObject.payload)

  if (messageObject.action === 'e') _.set(targetObject, messageObject.slot, messageObject.payload + value)

  return _.set(targetObject, messageObject.slot, value)
}
