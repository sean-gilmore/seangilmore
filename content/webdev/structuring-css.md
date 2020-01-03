---
title: "Structuring CSS"
date: 2020-01-03T10:41:05+11:00
draft: false
---

For a while now I've spent a fair bit of time thinking about (and writing) CSS. Writing CSS is one of those tasks I love - getting that instant visual feedback and knowing that you've managed to put together a website that is now not only functional but also beautiful and engaging is a really rewarding experience. It's also fun from the standpoint of taking someones design and being the one to bring it to life - like building with lego or putting together flat-pack furniture. But despite all the fun, CSS can quickly become a chore, especially when you're dealing with messy, un-organised and fragile CSS.

<!--more-->

This problem is caused by lots of factors and crops up the most when working on large projects over long periods of time with lots of developers contributing to the stylesheets. Deeply nested SASS selectors and un-decipherable class names can create a situation where it's easier for developers to just keep adding to the growing pile of styles, rather than make sensible changes that improve the overall CSS code base.

This poor practice leads to an ever growing pile of more and more complex and specific selectors (with plenty of `!important's` sprinkled on top), and it's a problem that won't go away easily.

With that said, when you finally have the opportunity to either start a new project, or get some much needed time to refactor your CSS, it's good to go into the the process with an idea of how you want your styles to be structured. I've come up with a few criteria that I think are important when writing well structured and easily maintainable CSS.

Your CSS should be:

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
  - Changing the HTML of the document should not break your styles

This might seem like a tall order, but I believe we can achieve all of the above and write CSS that is a joy to work with.

## Using BEM

[BEM](http://getbem.com/introduction/) is a general framework for how you should name and structure your css/scss. The name itself stands for Block Element Modifier, and suggests structuring your class names around the block of content they encapsulate, the elements within the block, and then any modifier properties that otherwise alter the default element style.

Take the example of building a calendar component - at the top level of your calendar you might have a `<div>` with the class of `calendar`.

<iframe width="100%" height="400px" class="iframe" src="https://codepen.io/SeanG7/pen/gOORjPb"></iframe>

Within the `calendar` block, you might have multiple elements - `calendar__header` for the cells at the top of the calendar, `calendar__today` for the current day, and `calendar__next-month` for the days that fall outside of the current month.

Following this pattern has resulted in us logically isolating our styles according to the elements in our component, with no side-effects on our styles because of the HTML structure of our document. We've also implemented a pattern that will be consistent across all the styles we create.

The benefit of this is that we will now be able to remove, or modify any of our styles, or restructure or remove HTML elements, without having to worry about unintended consequences. If we keep this structure consistent across all the styles we create, we're also going to find it very easy to jump back into any of our styles and quickly understand what they are trying to achieve.

## File Structure using 7-1

The choice for how you structure your files comes down to personal preference. For myself, I'm a big fan of the [7 - 1 Pattern](https://sass-guidelin.es/#the-7-1-pattern), as defined by [Hugo Giraudel](https://hugogiraudel.com/). Hugo does a great job of splitting out styles that should be generically applied across your site, versus those styles that apply specifically to certain components or elements. One of my biggest suggestions when picking/implementing a file structure, is that you attempt to split all of your BEM blocks into the separate files. This is easiest done when you approach each BEM block as a component, and you're already trying to logically separate your styles into discrete, reusable blocks.

Whatever file structure you do pick, should be used across all of your projects - increasing consistency and allowing developers to feel at home, no matter what project they're working in.

## Mixins

Mixins are your main weapon when dealing with code duplication and improving re-use. When approaching two BEM classes that share a lot's of the styles, the best thing to do is to refactor those styles out into a mixin.

Take the following example:

```scss
.button {
  background-color: $blue;
  border-radius: 5px;
  color: $white;

  &:hover {
    color: $black;
  }
}

.form__submit {
  background-color: $blue;
  border-radius: 5px;
  color: $white;

  &:hover {
    color: $green;
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

## Variables

Variables are a big part of SCSS, but one that I think is often underutilized. You should approach the use of variables from the perspective of trying to build a "design language". Creating variables from the following values is a great starting point:

- Break points
- Colours
- Font families
- Font sizes

Once you have these values defined, it's very easy to start including them in the rest of your SCSS. The end result will be a more consistent code base, with the added advantage of being able to make consistent changes across multiple elements, simply by tweaking any of your variable values.

An additional idea that I've been idea for a set of variables that I've been playing around with is to do with paddings and margins:

```scss
$padding-xl: 75px;
$padding-lg: 60px;
$padding-md: 45px;
$padding-sm: 30px;
$padding-xs: 15px;
```

Having a defined set of paddings or margins can help take away some of the inconsistencies in the end product (one element has margin/padding that does not match up with the surrounding elements) and help when deciding how an element should be styled.

## In closing

CSS is a tricky thing to get right. While I think I've found really good solutions to a lot of the common problems I've found with it, your mileage may vary. If you think you have a better approach to writing and structuring CSS, by all means stick with it. If you do have any suggestions, or comments about my approach, please reach out and let me know - I'd love to have some feedback. Thanks for reading, and I hope you enjoy writing your CSS 😄.
