function navLink(activeRoute, url, options) {
  return (
    "<li" +
    (url == activeRoute ? ' class="nav-item active" ' : ' class="nav-item" ') +
    '><a class="nav-link" href="' +
    url +
    '">' +
    options +
    "</a></li>"
  );
}

function equal(lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Ejs Helper equal needs 2 parameters");
  if (lvalue != rvalue) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
}

module.exports = {
  navLink: navLink,
  equal: equal,
};
