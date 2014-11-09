Compass experiments for writing optimised CSS
=============================================

We all know that compass has some built in features that can help you with css optimisation and duplication. Are there any caviats?

Is it even necessary to consider duplication? Is this over optimisation?

## Nesting

CSS stands for *Cascading Style Sheets* and that is exactly how it works. We have all gotten used to overriding style rules that come previously in the cascade, apply `!important` (only when necessary of course) and even how to overcome those tricky specificity issues like `i#m.an#idiot > a.nd#should + .never#be.let#near.css`.

But when we use SASS this goes out the window when you write code that nests a lot.

```scss
.foobar {
    .gazonk {
        &#today {
            // ...
        }
    }
}

// ...outputs...

.foobar .gazonk#today {
    // ...
}
```

Who wants to take that on in a fight? Not me.

Was there any need to nest those selectors at all? Probably not.

I would recommend that you avoid nesting completely unless it's for something like pseudo classes like `:hover` and `:active`.

Nesting also tempts developers to use tags as it *looks* as though we're only targeting the tags once we've drilled down through the parent selectors, but we all know that that is not [how CSS works](http://css-tricks.com/why-browsers-read-selectors-right-to-left/).

## Mixins
Mixins seem to work by outputting the mixin result to the ***specific place the @include is placed***.

This means that for this code

```scss
@mixin foobar {
    color: red;
    background: yellow;
}

.gazonk {
    @include foobar;
}

.boom {
    @include foobar;
}

// ...outputs...

.gazonk {
    color: red;
    background: yellow;
}

.boom {
    color: red;
    background: yellow;
}
```

Clearly, if you're anal, this duplication seems unnecessary, I mean, if you were writing the CSS by hand, you'd simply chain the selectors together like this:

```css
.gazonk,
.boom {
    color: red;
    background: yellow;
}
```

## Extending classes

Let's try with a different approach.

```scss
.foobar {
    color: red;
    background: yellow;
}

.gazonk {
    @extend .foobar;
}

.boom {
    @extend .foobar;
}

// ...outputs...

.foobar,
.gazonk,
.boom {
    color: red;
    background: yellow;
}
```

Awesome, we've grouped all the selectors together and it looks very pretty, except now we've got an extra class we don't want in there. It probably doesn't matter, but we want them to extend .foobar and not use it.

We can simply replace the `.foobar` with a `%foobar` and the output will be

```css
.gazonk,
.boom {
    color: red;
    background: yellow;
}
```

Ok that's awesome right, we've avoided the duplication that mixins give us, and we're feeling pretty good about ourselves.

### The caviat

So, you of course read the section on nesting and know the importance of the cascade in CSS. Simply put, @extend in SCSS will fuck up your cascade.

```scss
.abstract-class {
    color: red;
}

.my-thing {
    color: blue;
}

.my-thing {
    @extend %abstract-class;
}
```

What colour did you want `.my-thing` to be? **Red** of course! Why else would you have put it in the cascade like that?

What colour is it going to be? **Blue** of course!

Why? Because @extend will tell compass to take the `.my-thing` class and add it ***WHERE THE .abstract-class is in the cascade***!

Giving you this:

```css
.abstract-class,
.my-thing {
    color: red;
}

.my-thing {
    color: blue;
}
```

If you think about it, how else would you do it? Check all the properties on every selector that extends the `.abstract-class`. That's going to get crazy real quick.

I am also available for children's parties. Thankyou.
