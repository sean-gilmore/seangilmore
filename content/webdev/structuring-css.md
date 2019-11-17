---
title: "Structuring CSS 🚧"
date: 2019-02-20T22:03:35+11:00
draft: true
---

For a while now I've spent a fair bit of time thinking about (and writing) CSS. Writing CSS is one of those tasks I love - getting that instant visual feedback and knowing that you've managed to put together a website that is now not only functional but also beautiful and engaging is a really rewarding experience. It's also fun from the standpoint of taking someones design and being the one to bring it to life - like building with lego or putting together flat-pack furniture. But despite all the fun, CSS can quickly become a chore, especially when you're dealing with messy, un-organised and fragile CSS.

<!--more-->

This problem is caused by lots of factors and crops up the most when working on large projects over long periods of time with lots of developers contributing to the stylesheets. Deeply nested SASS selectors and un-decipherable class names can create a situation where it's easier for developers to just keep adding to the growing pile of styles, rather than make sensible changes that improve the overall CSS code base.

This poor practice leads to an ever growing pile of more and more complex and specific selectors (with plenty of `!important's` sprinkled on top), and it's a problem that won't go away easily.

With that said, when you finally have the opportunity to either start a new project, or get some much needed time to refactor your CSS, it's good to go into the the process with a good idea of how you want your styles to be structured. I've come up with a few criteria that I think are important when writing well structured and easily maintainable CSS. Your CSS should be:

- Easy to understand
  - Follow a simple, logical, familiar structure
  - Avoid complex selectors
- Easy to extend
  - Without duplicating styles unnecessarily
  - Without introducing complexity
- Easy to update
  - Avoid breaking things by mistake
  - Can confidently modify or remove styles
- Should be robust
  - Changing the html of the document should not break your styles

This might seem like a tall order, but I believe we can achieve all of the above so we can get back to having with CSS.

## Using BEM

BEM is a general framework for how you should name and structure your css/scss. The name itself stands for Block Element Modifier, and suggests structuring your class names around the block of content they encapsulate, the elements within the block, and then any modifier properties that otherwise alter the default element style.

Take the example of building a calendar component - at the top level of your calendar you might have a `<div>` with the class of `calendar`.

<iframe width="100%" height="400px" class="iframe" src="https://codepen.io/SeanG7/pen/gOORjPb"></iframe>

Within the `calendar` block, you might have multiple elements - `calendar__header` for the cells at the top of the calendar, `calendar__today` for the current day, and `calendar__next-month` for the days that fall outside of the current month.

We now have a clear link between our block and each of the elements that fall within it, we've decoupled our inner element styles from the block they live within, and we've built something that is going to be easy to maintain in the future.

## File Structure using 7-1

The choice for how you structure your files comes down to personal preference. For myself, I'm a big fan of the [7 - 1 Pattern](https://sass-guidelin.es/#the-7-1-pattern), as defined by [Hugo Giraudel](https://hugogiraudel.com/). Hugo does a great job of splitting out styles that should be generically applied across your site, versus those styles that apply specifically to certain components or elements. 

This file structure should be used across all of your projects - increasing consistency and allowing developers to feel at home, no matter what project they're working in.

## Mixins

Mixins are your main weapon when dealing with code duplication and improving re-use. When approaching two BEM classes that share a lot's of the styles, the best thing to do is to refactor those styles out into a mixin.

Take the following example:

```css
.button {
  background-color: blue;
  border-radius: 5px;
  color: white;

  &:hover {
    color: black;
  }
}

.form__submit {
  background-color: blue;
  border-radius: 5px;
  color: white;

  &:hover {
    color: green;
  }
}
```

We can easily refactor styles styles into a mixin, as shown:

```scss
@button {
  background-color: blue;
  border-radius: 5px;
  color: white;
}

.button {
  @include button;

  &:hover {
    color: black;
  }
}

.form__submit {
  @include button;

  &:hover {
    color: green;
  }
}

```

This gives us a clear base button style in the `@button` mixin, which we can then apply to the specific BEM class instances. This also gives us the ability to override any of the base `@button` styles, without affecting the any of the elements the `@button` is applied to.

TODO: This above example would make more sense if I actually broke down the example more. Maybe check the document you made for Arcadian.

## Variables

Should quickly talk about how variables can be used to simplify your code base;

--------------

# Notes
