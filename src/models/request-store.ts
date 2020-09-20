interface Param {
  name: string,
  value: string,
}

export interface RequestStore<T> {
  url: string,
  params: {[name: string]: any},
  data: T,
}
