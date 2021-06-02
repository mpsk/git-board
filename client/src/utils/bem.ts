type Mods = Array<string | undefined> | Record<string, boolean> | string;

export const bemPrefix = (classNamePrefix: string) => (className?: string, modifications?: Mods): string => {
  const coreClass = className ? [classNamePrefix, className].join('__') : classNamePrefix;
  const classNames = [coreClass];
  const mods = resolveMods(modifications);

  if (mods.length) {
    mods.forEach(mod => mod && classNames.push(`${coreClass}--${mod}`));
  }

  return classNames.join(' ');
};

function resolveMods(mods: Mods = []): Array<string | undefined> {
  if (isObject(mods)) {
    return Object.keys(mods).reduce((res: string[], mod: string) => {
      return mods[mod] ? [...res, mod] : res;
    }, []);
  } else {
    return Array.isArray(mods) ? mods : [mods];
  }
}

function isObject(mods: Mods): mods is Record<string, boolean> {
  return !Array.isArray(mods) && typeof mods === 'object';
}
