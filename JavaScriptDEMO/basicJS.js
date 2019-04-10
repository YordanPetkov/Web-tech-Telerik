var name = "Svetlin Nakov";
document.write(name.length);
document.write('<br/>');

document.write(name[0]);
document.write('<br/>');

document.write(name.charAt(1));
document.write('<br/>');

document.write(name.substring(0,7));
document.write('<br/>');

document.write(name.slice(8));
document.write('<br/>');

document.write(name.split(' ')[1]);
document.write('<br/>');

document.write(name.indexOf(' '));
document.write('<br/>');

document.write(name.match(/N\w+/));
document.write('<br/>');

document.write(name.match(/\d+/));
document.write('<br/>');

document.write(name.replace('N', 'T'));
document.write('<br/>');

document.write(name.toLowerCase());
document.write('<br/>');

document.write(name.fontsize(20).bold());
document.write('<br/>');
