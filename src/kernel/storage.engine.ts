import { StorageEngine } from '@ngxs/storage-plugin';

export class MyStorageEngine implements StorageEngine {

  get length(): number {
    return localStorage.length
  }

  getItem(key: string): any {
    return localStorage.getItem(key)
  }

  setItem(key: string, val: any): void {

    val = val && JSON.parse(val)

    if (val && key === '@@STATE') {
      delete val.loading
      delete val.router
    }

    localStorage.setItem(key, JSON.stringify(val))
  }

  removeItem(key: string): void {
    localStorage.removeItem(key)
  }

  clear(): void {
    localStorage.clear()
  }
}
