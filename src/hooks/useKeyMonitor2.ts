import { useState, useEffect } from 'react'
import { fromEvent } from 'rxjs'
import { groupBy, map, merge, mergeAll, distinctUntilKeyChanged } from 'rxjs/operators'

// this is an experimetal approach - not ready yet - just testing

export enum ModifierEnum {
  Shift = 16,
  Ctrl = 17,
  Alt = 18
}

export class KeyScope {
  public key: string
  public modifiers: ModifierEnum[]
  constructor(ke: KeyboardEvent) {
    this.key = ke.key
    this.modifiers = []
  }
}

export function useKeyMonitor() {
  const [keyScope, setKeyScope] = useState<KeyScope>();

  useEffect(() => {
    const keyDowns = fromEvent<KeyboardEvent>(document, "keydown")
    const keyUps = fromEvent<KeyboardEvent>(document, "keyup")

    const keyPresses = keyDowns.pipe(
      merge(keyUps),
      groupBy(e => e.keyCode),
      map(group$ => group$.pipe(distinctUntilKeyChanged('keyCode'))),
      mergeAll()
    )

    const sub = keyPresses.subscribe(o => {
      setKeyScope(new KeyScope(o))
      console.log(o.key)
    })

    return () => sub.unsubscribe()
  }, [])

  return keyScope
}