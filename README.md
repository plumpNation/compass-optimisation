Compass experiments for writing optimised CSS
=============================================

We all know that compass will try to not write duplicated CSS but what are, if any, the specifics
that a developer should know about to avoid printing duplicated CSS into the built output.

Is it even necessary? Is this over optimisation?

Things to try:
1. Cascading using extend.
Can one overwrite previous rules using @extend?
Where will it place all the relevant CSS?
