+++
date = "2018-10-30T17:16:45+00:00"
draft = true
title = "Rails: Getting started with Ajax forms"

+++

Rails Ajax form submission is a topic that is widely covered, but I'm yet to find a resource that deals with how to set up a completely custom implementation, from form submission to controller action, through to returning some response via Javascript and updating the page view dynamically.

When I was learning about ajax form submission, I put together this document to help myself in the future. The problem I was working on at the time was to create a 'hand raisers' form that would submit and update with a response from the server if the submission had been successful, or if it had issues.

I hope you too can get some use from it.

<!-- read more -->

Heres the gist:

## Remote: true

`remote: true` and `method: :post` should be added to your form.
Adding this `remote: true` settings will tell ruby to submit the form via ajax, and render the associated methods js file in response to the request.

```html
 <%= form_tag form_path, method: :post, remote: true, class: 'contact-form', id: 'contact-form' do %>
  ...
 <% end %>
 <div id="handraisers__response-title"></div>
 <div id="handraisers__response-text"></div>
```

## Adding a form route

A route must be added to your `routes.rb` file. This tells that the path the form is submitting to calls this controller action. All form parameters can be accessed in the standard `param[:field_name]` manner.

```Ruby
post 'form_path', to: 'controller_name#action_name'
```

## Adding an action
You must have a controller and action that matches those specified in your `routes.rb` file.

The code inside of this action is what will be called once the form is submitted.

You should have all form validation and logic here.

Variables that you wish to access later should be set here, using the `@variable_name` syntax.

An example is shown below:

```Ruby
  def handraiser
    first_name = params[:first_name] # you can access params just like normal
    last_name = params[:last_name]
    email = params[:email]
    email_confirmation = params[:email_confirmation]

    if is_a_valid_email?(email) && email == email_confirmation
      @message = 'success'
      ActiveCampaignHandraiserJob.perform_later(email, first_name, last_name)
    elsif email != email_confirmation
      @message = 'nomatch'
    elsif !is_a_valid_email?(email)
      @message = 'invalid'
    end
  end
```

## Updating the view

By default rails will fire the associated `action_name.js.erb` file for all `remote: true` form submissions.

It's here that we can update the view and access our previously set `@message` variable. Make sure this goes in the `action_name.js.erb` file!

Below is an example of handling the response of the the forms ajax request:

```javascript
$(document).ready(function(){
  var message = "<%= escape_javascript(@message) %>";
  var responseTitle = '';
  var responseText = '';
  $('#contact-form').on("ajax:success", function(e, data, status, xhr){
    if (message == 'success') {
      responseTitle = 'Thank you for contacting us';
      responseText = 'Check your inbox for your first free email.';
    } else if (message == 'invalid') {
      responseTitle = 'The email you submitted is invalid';
      responseText = 'Please Update your email address and resubmit the form.';
    } else if (message == 'nomatch') {
      responseTitle = 'Your email did not match!';
      responseText = 'Please Update your email address and resubmit the form.';
    } else {
      responseTitle = 'There was an error submitting your form';
      responseText = 'Please try again later.';
    }
    $('#handraisers__response-title').text(responseTitle);
    $('#handraisers__response-text').text(responseText);
  }).on("ajax:error", function(e, data, status, xhr){
    $('#handraisers__response-title').text('There was an error submitting your form');
    $('#handraisers__response-text').text('Please try again later.');
  });

});
```

Make sure you take specific care with the `var message = "<%= escape_javascript(@message) %>";` line, as you can run into really annoying situations where Rails doesn't like outputting the content, or JavaScript doesn't like reading the outputted content. Use double quotes and the `escape_javascript` helper to get the right result.

## Debugging

I've found that the easiest way to debug ajax form submissions is to use the network tab of Chrome dev tools. You should have this tab open with testing your ajax form submission and be listening out for the response. If the response output in this tab doesn't match your expected output, you've got a problem.

I also recommend using [byebug](https://github.com/deivid-rodriguez/byebug) and chucking a debugging statement in your controller action to ensure your program is reaching that point.

Otherwise, good luck!

Let me know if I've missed anything or have any issues in my code so that I can update this post for future visitors.