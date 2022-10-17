function UserTable({ _content, _form, _addButton, _userInfo, _localStorageKeyName}) {

    this.init = function () {
        this.onSubmit();
        this.onAddButton();
        this.loadUser();
    }

    this.onSubmit = function () {
        _form.addEventListener('submit', (event) => {
            event.preventDefault();
            // if (_form.elements['id'].value) {
            //     this.updateUser({
            //         name: _form.elements['name'].value,
            //         age: _form.elements['age'].value,
            //         phone: _form.elements['phone'].value,
            //         id: _form.elements['id'].value,
            //     })
            // } else {
                this.addUser({
                    name: _form.elements['name'].value,
                    age: _form.elements['age'].value,
                    phone: _form.elements['phone'].value,
                    id: Math.floor(Math.random() * 100),
                })
            // }
            _form.reset();
            _form.classList.remove('open');
        })
    }

    // this.updateUser = function (user) {
    //     const users = JSON.parse(localStorage.getItem(_localStorageKeyName));
    //     const newUsers = users.map(function (item) {
    //         if (+item.id === +user.id) {
    //             return user;
    //         }
    //         return item;
    //     });
    //     _content.innerHTML = '';
    //     newUsers.forEach(user => this.userTemplate(user));
    //     localStorage.setItem(_localStorageKeyName, JSON.stringify(newUsers));
    // }

    this.addUser = function (user) {
        this.userTemplate(user);
        const users = JSON.parse(localStorage.getItem(_localStorageKeyName)) || [];
        users.push(user);
        localStorage.setItem(_localStorageKeyName, JSON.stringify(users));
    }

    this.userTemplate = function (user) {
        _content.insertAdjacentHTML('beforeend', (
            `<tr data-id="${user.id}">`+
                `<td>${user.id}</td>`+
                `<td>${user.name}</td>`+
                `<td>${user.phone}</td>`+
                `<td>${user.age}</td>`+
                `<td>`+
                    '<button type="button" class="btn btn-primary js--view">View</button>'+
                    ' <button type="button" class="btn btn-primary js--edit">Edit</button>'+
                    ' <button type="button" class="btn btn-primary js--delete">Delete</button>'+
                `</td>`+
            `</tr>`
        ))
        const _currentTr = document.querySelector(`[data-id="${user.id}"]`);
        const viewButton = _currentTr.querySelector('.js--view');
        const handleView = () => {
            _userInfo.innerHTML = JSON.stringify(user, undefined, 2);
        }
        viewButton.addEventListener('click', handleView);

        // const editButton = _currentTr.querySelector('.js--edit');
        // const handleEdit = () => {
        //     _form.reset();
        //     _form.classList.add('open');
        //     _form.elements['id'].value = user.id;
        //     _form.elements['name'].value = user.name;
        //     _form.elements['phone'].value = user.phone;
        //     _form.elements['age'].value = user.age;
        // }
        // editButton.addEventListener('click', handleEdit);


        const deleteButton = _currentTr.querySelector('.js--delete');
        deleteButton.addEventListener('click', () => {
            const array = JSON.parse(localStorage.getItem(_localStorageKeyName));

            const newArray = array.filter(el => el.id !== +_currentTr.dataset.id);
            _currentTr.remove();

            localStorage.setItem(_localStorageKeyName, JSON.stringify(newArray));
            
        });
    }

    this.onAddButton = function () {
        _addButton.addEventListener('click', function () {
            _form.classList.add('open');
        })
    }

    this.loadUser = function () {
        const users = JSON.parse(localStorage.getItem(_localStorageKeyName));
        if (users) {
            users.forEach(userItem => this.userTemplate(userItem));
        }
    }
}

const userDate = new UserTable({
    _content: document.querySelector('.js--content'),
    _form: document.querySelector('.js--form'),
    _addButton: document.querySelector('.js--add'),
    _userInfo: document.querySelector('.js--user'),
    _localStorageKeyName: 'users',
});

document.addEventListener('DOMContentLoaded', function () {
    userDate.init();
})

