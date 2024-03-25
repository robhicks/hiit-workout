import nt from '$lib/new-testament-reference.json'


export default function getReference(ref) {
  try {
    console.log(`ref`, ref)
    const bookRef = ref?.split(' ')
    const book = nt[bookRef[0]]
    const restRef = bookRef[1]
    const chapterRef = restRef.split(':')
    const chapter = book[chapterRef[0]]
    let verseRef = chapterRef[1].split('-')
    // console.log(`verseRef`, verseRef)
    if (verseRef.length > 1) {
        const firstVerse = +verseRef[0]
        const lastVerse = +verseRef[1]
        const allVerses = []
        for (let i = firstVerse; i <= lastVerse; i++) {
            const v = chapter[i]
          allVerses.push(`${i}. ${v}`)
        }
        return allVerses.join(' ')
    }
    verseRef = chapterRef[1].split(',')
    if (verseRef.length > 1) {
      const allVerses = verseRef.map((v) => `${v}. ${chapter[v]}`)
      return allVerses.join(' ')
    }
    return chapter[verseRef[0]]
  } catch (error) {
    return error.message
  }
}
