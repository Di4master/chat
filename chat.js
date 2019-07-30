let user1 = {
    id: 1,
    name: 'Стивен Джобс',
    photo: 'icons/jobs.jpg',
    age: 52
};
let user2 = {
    id: 2,
    name: 'Уильям Гейтс',
    photo: 'icons/gates.jpg',
    age: 51
};

class Card {
    constructor(user) {
        this.user = {
            id: user.id,
            name: user.name,
            photo: user.photo,
            age: user.age
        };
    }
    getFullCard() {
        let fullCard = this.getBlock('user-card');
        fullCard.append( this.getIcon() );
        fullCard.append( this.getUserInfo() );
        return fullCard;
    }
    getIcon() {
        let blockPhoto = this.getBlock('user-card__photo');
        blockPhoto.style.backgroundImage = `url(${this.user.photo})`;
        blockPhoto.style.backgroundPosition = 'center';
        blockPhoto.style.backgroundSize = 'cover';
        return blockPhoto;
    }
    getUserInfo() {
        let blockInfo = this.getBlock('user-card__info');
        blockInfo.append( this.getUserNameBlock() );
        blockInfo.append( this.getUserAgeBlock() );
        return blockInfo;
    }
    getUserNameBlock() {
        let blockName = this.getBlock('user-card__name');
        blockName.innerText = this.user.name;
        return blockName;
    }
    getUserAgeBlock() {
        let blockAge = this.getBlock('user-card__age');
        blockAge.innerText = 'Возраст: ' + this.user.age;
        return blockAge;
    }
    getBlock(className) {
        let block = document.createElement('div');
        block.className = className;
        return block;
    }
}

class Chat {
    constructor(chatElementSelector) {
        this.users = [],
        this.chatWindowElem = document.querySelector(chatElementSelector)
    }

    setUser(userObject, formSelector, messageClass) {
        this.users[userObject.id] = {
            id: userObject.id,
            name: userObject.name,
            messageClass: messageClass
        };
        let form = document.querySelector(formSelector);
        form.setAttribute('data-user', userObject.id);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            let textarea = event.currentTarget.querySelector('textarea');
            if (textarea.value == '') return;
            let userId = event.currentTarget.dataset.user;
            let user = this.users[userId];
            let title = `${user.name} ${this.getCurrentDateTime()}`;
            this.addMessageToChat(title, textarea.value, user.messageClass);
            textarea.value = '';
        });
    }

    addMessageToChat(messageTitle, messageText, messageClass) {
        let messageBlock = document.createElement('div');
        messageBlock.className = `message ${messageClass}`;

        let messageTitleBlock = document.createElement('div');
        messageTitleBlock.className = `message__title`;
        messageTitleBlock.innerText = messageTitle;
        messageBlock.appendChild(messageTitleBlock);

        let messageTextBlock = document.createElement('div');
        messageTextBlock.className = `message__text`;
        messageTextBlock.innerText = messageText;
        messageBlock.appendChild(messageTextBlock);

        this.chatWindowElem.appendChild(messageBlock);
        this.chatWindowElem.scrollTop = this.chatWindowElem.offsetHeight;
    }

    getCurrentDateTime() {
        let dt = new Date();
        let day = this.addLeadingZero(dt.getDate() );
        let month = this.addLeadingZero(dt.getMonth() + 1);
        let hours = this.addLeadingZero(dt.getHours() );
        let minutes = this.addLeadingZero(dt.getMinutes() );
        let seconds = this.addLeadingZero(dt.getSeconds() );
        let time = `${hours}:${minutes}:${seconds}`;
        let date = `${day}.${month}.${dt.getFullYear()}`;
        return `${date} ${time}`;
    }

    addLeadingZero(value) {
        return value < 10 ? `0${value}` : value;
    }
}

let userCard1 = new Card(user1);
let userBlock1 = document.querySelector('.user1');
userBlock1.insertBefore( userCard1.getFullCard(), document.getElementById('user1-form') );

let userCard2 = new Card(user2);
let userBlock2 = document.querySelector('.user2');
userBlock2.insertBefore( userCard2.getFullCard(), document.getElementById('user2-form') );

let chat = new Chat ('div.messages');
chat.setUser(user1, '#user1-form', 'message--left');
chat.setUser(user2, '#user2-form', 'message--right');