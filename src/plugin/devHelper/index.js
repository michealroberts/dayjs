/* eslint-disable no-console */
export default (o, c, d) => {
  if (!process || process.env.NODE_ENV !== 'production') {
    const proto = c.prototype
    const oldParse = proto.parse
    proto.parse = function (cfg) {
      const { date } = cfg
      if (typeof date === 'string' && date.length === 13) {
        console.warn(`To parse a Unix timestamp like ${date}, you should pass it as a Number. https://day.js.org/docs/en/parse/unix-timestamp-milliseconds`)
      }
      if (typeof date === 'number' && String(date).length === 4) {
        console.warn(`Guessing you may want to parse the Year ${date}, you should pass it as a String ${date}, not a Number. Otherwise, ${date} will be treated as a Unix timestamp`)
      }
      if (cfg.args.length >= 2 && !d.p.customParseFormat) {
        console.warn(`To parse a date-time string like ${date} using the given format, you should enable customParseFormat plugin first. https://day.js.org/docs/en/parse/string-format`)
      }
      return oldParse.bind(this)(cfg)
    }
  }
}

