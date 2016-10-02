
export default {
    success: function (msg) {
        alert(msg);
    },
    error: function (err) {
        alert('Error in notifier msg!');
        console.error(err);
    }
}