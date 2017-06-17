z-modal
=====================

Z-modal for AngularJS - supports creating modals via a service.
When modal is:
* `opened`: its content is appended to html body
* `closed`: its content is removed from html body

See demo at [zycio.github.io/z-modal/](https://zycio.github.io/z-modal/).

## Usage
Install with bower

```bash
bower install --save z-modal
```

Then reference the minified css
```css
<link href="bower_components/z-modal/dest/modal.min.css" rel="stylesheet">
```

Then reference the minified script
```html
<script src="bower_components/z-modal/dest/modal.min.js"></script>
```

Specify the modal service as dependency of your application
```js
var app = angular.module('myApp', ['ZModal']);
```

Inject the modal service
```js
app.controller('MyAppController', ['$scope','ZModal', function($scope, ZModal) {
    $scope.showModal = function() {
        ZModal.info('Header text', 'Description text');
    };
}]);
```

## Modal types
'info' - Shows default modal with header and description text. Returns nothing.
Usage:
```js
ZModal.info('Header text', 'Description text');
```

'confirm' - Shows modal as in info but with 'cancel' and 'confirm' buttons. Returns promise.
Usage
```js
ZModal.confirm('Header text', 'Description text')
.then(function() {
    // CONFIRMED
})
.catch(function() {
    // CANCELLED
});
```

'custom' - Shows custom modal. Options:
* `template`: Path to modal content template.
* `header`: Header text.
* `description`: Description text.
* `buttons`: Buttons config. There can be one or two buttons. For each of them you can set text.
* `autoclose`: Time in ms to autoclose modal.

Usage
```js
ZModal.custom({
    template: 'modal-template.html',
    header: 'Header text',
    buttons: {
        cancel: 'Cancel',
        confirm: 'Confirm'
    }
})
.then(function(data) {
    // CONFIRMED
    // data - stores data from form
})
.catch(function() {
    // CANCELLED
});
```

Example template
```html
<div>
    <form name="modalForm" novalidate>
        <div>
            <input type="text" name="username" ng-model="vm.data.username" placeholder="Username">
        </div>
        <div>
            <input type="text" name="info" ng-model="vm.data.info" placeholder="Info">
        </div>
    </form>
</div>
```

## Releasing
```bash
bower install
npm install
grunt dest
```
