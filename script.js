let currentClass = '';

function joinClass(cls){
    currentClass = cls;
    document.getElementById('class-title').innerText = cls + " Sohbeti";
    showSection('class-chat');
    loadMessages();
}

function sendMessage(){
    const msg = document.getElementById('chat-input').value;
    if(msg.trim()=='') return;
    const user = auth.currentUser.email;

    // Mesaj gönder
    db.collection('classes')
      .doc(currentClass)
      .collection('messages')
      .add({
          user: user,
          message: msg,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    document.getElementById('chat-input').value='';
}

// Gerçek zamanlı mesajları çek
function loadMessages(){
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML='';

    db.collection('classes')
      .doc(currentClass)
      .collection('messages')
      .orderBy('timestamp')
      .onSnapshot(snapshot=>{
          chatBox.innerHTML='';
          snapshot.forEach(doc=>{
              const data = doc.data();
              const p = document.createElement('p');
              p.innerHTML = `<b>${data.user}:</b> ${data.message}`;
              chatBox.appendChild(p);
          });
          chatBox.scrollTop = chatBox.scrollHeight;
      });
}
