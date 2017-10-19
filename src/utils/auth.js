import Cookies from 'js-cookie'

const Type = 'LYXQ-type';
const Id = 'LYXQ-id';

export function getType() {
  return Cookies.get(Type)
}

export function setType(type) {
  return Cookies.set(Type, type)
}

export function removeType() {
  return Cookies.remove(Type)
}

export function getId() {
  return Cookies.get(Id)
}

export function setId(id) {
  return Cookies.set(Id, id)
}

export function removeId() {
  return Cookies.remove(Id)
}
