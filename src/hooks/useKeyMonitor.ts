import { useRef, useState, useEffect } from 'react'
import { fromEvent } from 'rxjs'
import { filter, map, distinctUntilKeyChanged } from 'rxjs/operators'
import { KEY_CODE_SHIFT, KEY_CODE_CTRL, KEY_CODE_ALT } from '../constants';

const modifierKeyCodes = [KEY_CODE_SHIFT, KEY_CODE_CTRL, KEY_CODE_ALT];

export function useKeyMonitor() {
  const modifiers = useRef<number[]>([])
  const [keyScope, setKeyScope] = useState<KeyScope>();

  useEffect(() => {
    const keysDownStream = fromEvent<KeyboardEvent>(document, "keydown")
      .pipe(
        distinctUntilKeyChanged('keyCode'),
        map((e: KeyboardEvent) => new KeyScope(e, modifiers.current)),
        filter((ks: KeyScope) => ks.isModifierKey)
      )
      .subscribe((ks: KeyScope) => {
        modifiers.current = [...modifiers.current, ks.keyCode]
      });

    const keysUpStream = fromEvent<KeyboardEvent>(document, "keyup")
      .pipe(map((e: KeyboardEvent) => new KeyScope(e, modifiers.current)))
      .subscribe(ks => {
        if (ks.isModifierKey) {
          modifiers.current = modifiers.current.filter(i => i !== ks.keyCode)
        } else {
          setKeyScope(ks)
        }
      });

    return () => {
      keysDownStream.unsubscribe();
      keysUpStream.unsubscribe();
    }
  }, [])

  return { keyScope }
}

export class KeyScope {
  public key: string
  public keyCode: number
  public isModifierKey: boolean
  constructor(ke: KeyboardEvent, public modifiers: number[]) {
    this.key = ke.key
    this.keyCode = ke.keyCode || ke.which
    this.isModifierKey = modifierKeyCodes.includes(ke.keyCode)
  }
}