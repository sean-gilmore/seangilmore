---
title: "Structuring CSS or: How I Learned to Stop Worrying and Love the BEM 💣"
date: 2019-02-20T22:03:35+11:00
draft: true
---

For a while now I've spent a fair bit of time thinking about (and writing) CSS. Writing CSS is one of those tasks I love - getting that instant visual feedback and knowing that you've managed to put together a website that is now not only functional but also beautiful and engaging. It's also fun from the standpoint of taking someones design and being the one to bring it to lif, like building with lego or putting together flatpack furniture. But there is one issue with writing and working with CSS - worrying about how your CSS is going to be maintained over time.

<!--more-->

This problem is caused by lots of factors and crops up the most when working on large projects over long periods of time with lots of developers contributing to the stylesheets. Deeply nested sass stylesheets and un-decipherable class names can create a situation where it's easier for developers to just keep adding to the growing pile of styles, than wade through the mess and understand what's going on and figure out what affects changes to the current styles will have on the frontend.

This leads to an ever growing pile of more and more complex and specific selectors (with plenty of `!important's` sprinkled on top), and you've got a problem that is not going away easily.

With that said, when you finally have the opportunity to either start a new project, or get some much needed time to refactor your CSS, it's good to go into the the process with a good idea of how you want your styles to be structured. I've come up with a few criteria that I think are important to well structured and easily maintainable CSS. They are as follows:

- Easy to understand
  - Follow a simple, logical structure
  - Avoid complex selectors
- Easy to extend
  - Without duplicating styles uncessarily
- Easy to update
  - Avoiding breaking things by mistake
  - Can confidently modify or remove styles
- Should be robust
  - Changing the html of the document should not unnecessarily break your styles

This might seem like a tall order, but if we start of follow a couple of important rules when creating and updating our styles, we should be able to achive the above requirements in no time at all.

## Using BEM

## File Stucture

## Mixins and Varaibles
