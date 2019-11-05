---
title: "Structuring CSS"
date: 2019-02-20T22:03:35+11:00
draft: true
---

For a while now I've spent a fair bit of time thinking about (and writing) CSS. Writing CSS is one of those tasks I love - getting that instant visual feedback and knowing that you've managed to put together a website that is now not only functional but also beautiful and engaging. It's also fun from the standpoint of taking someones design and being the one to bring it to life, like building with lego or putting together flatpack furniture. But there is one issue with writing and working with CSS - worrying about how your CSS is going to be maintained over time.

<!--more-->

This problem is caused by lots of factors and crops up the most when working on large projects over long periods of time with lots of developers contributing to the stylesheets. Deeply nested SASS stylesheets and un-decipherable class names can create a situation where it's easier for developers to just keep adding to the growing pile of styles, than wade through the mess and understand what's going on and figure out what affects changes to the current styles will have on the frontend.

This leads to an ever growing pile of more and more complex and specific selectors (with plenty of `!important's` sprinkled on top), and you've got a problem that is not going away easily.

With that said, when you finally have the opportunity to either start a new project, or get some much needed time to refactor your CSS, it's good to go into the the process with a good idea of how you want your styles to be structured. I've come up with a few criteria that I think are important to well structured and easily maintainable CSS. They are as follows:

- Easy to understand
  - Follow a simple, logical structure
  - Avoid complex selectors
- Easy to extend
  - Without duplicating styles unnecessarily
- Easy to update
  - Avoiding breaking things by mistake
  - Can confidently modify or remove styles
- Should be robust
  - Changing the html of the document should not unnecessarily break your styles

This might seem like a tall order, but if we start of follow a couple of important rules when creating and updating our styles, we should be able to achieve the above requirements in no time at all.

## Using BEM

BEM is a general framework for how you should name and structure your css/scss. The name itself stands for Block Element Modifier, and suggests structuring your class names around the block of content they encapsulate, the elements within the block, and then any modifier properties that otherwise alter the default element style.

Take the example of building a calendar component - at the top level of your calendar you might have a `<div>` with the class of `calendar`.

<iframe width="100%" height="400px" class="iframe" src="https://codepen.io/SeanG7/pen/gOORjPb"></iframe>

Within the `calendar` block, you might have multiple elements - `calendar__header` for the cells at the top of the calendar, `calendar__today` for the current day, and `calendar__next-month` for the days that fall outside of the current month.

We now have a clear link between our block and each of the elements that fall within it, we've decoupled our inner element styles from the block they live within, and we've built something that is going to be easy to maintain in the future.

## File Structure using 7-1



## Mixins and Variables



--------------

# Notes
