var pilihan = true;
var item = ['gunting','batu','kertas'];
while(pilihan){
// Pilihan player
var player = prompt("Silahkan pilih (gunting , batu ,kertas)");
// Pilihan Computer
var comp = Math.round(Math.random()*6)+1;
if(comp < 3){
    comp = item[0];
}
else if(comp < 5 && comp > 2){
    comp = item[1];
}
else {
    comp = item[2];
}


var hasil='';
// Menentukan Rules
if(player == comp){
    hasil = 'SERI!';
}
else if(player == item[0]){
   hasil = (comp == item[1]) ? 'KALAH!' : 'MENANG!';
}
else if(player == item[1]){
    hasil = (comp == item[0]) ? 'MENANG!' : 'KALAH!';
}
else if(player == item[2]){
    hasil = (comp == item[1]) ? 'MENANG!' : 'KALAH!';
}
else if(player == ''){
    alert('Pilihan tidak boleh kosong!!');
}
else if(player !== item){
    alert('Pilihan tidak tersedia!!');
}

// Tampilkan hasil
if(item.includes(player)){
if(player !== ''){
alert("Anda memilih " + player + ' dan Komputer memilih ' + comp + '\nMaka hasilnya : anda ' + hasil);
}
}


pilihan = confirm("Ingin Ulang Lagi?");
}

alert('Terimakasih sudah bermain!!');