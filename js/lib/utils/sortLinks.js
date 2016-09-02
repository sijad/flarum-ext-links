export default function sortLinks(links) {
  return links.slice(0).sort((a, b) => {
    const aPos = a.position();
    const bPos = b.position();

    const aParent = a.parent();
    const bParent = b.parent();

    // If they both have the same parent, then their positions are local,
    // so we can compare them directly.
    if (aParent === bParent) return aPos - bPos;

    // If they are both child links, then we will compare the positions of their
    // parents.
    else if (aParent && bParent) return aParent.position() - bParent.position();

    // If we are comparing a child link with its parent, then we let the parent
    // come first. If we are comparing an unrelated parent/child, then we
    // compare both of the parents.
    else if (aParent) return aParent === b ? 1 : aParent.position() - bPos;

    else if (bParent) return bParent === a ? -1 : aPos - bParent.position();

    return 0;
  });
}
