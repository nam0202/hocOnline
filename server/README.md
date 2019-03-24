# Get API Have REF
Example:
http://localhost:8222/api/news?page=1&limit=2&ref=["members","category"]&map=["username","123"]

## Notifycation format body 

```js
data = [
    {
        dayTitle: 'Thứ 5', dayDetail:new Date(2019,2,28),
        data: [
            {
                timeData: "07:00",
                content: "Ngày mai là hạn cuối nộp bài tập về nhà. Bạn nhớ hoàn thành bài tập và đẩy lên Github nhé!",
                isAlarm: true,
            },
        ]
    },
    {
        dayTitle: 'Thứ 6', dayDetail:new Date(2019,2,29), data: [
            {
                timeData: "07:00",
                content: "Nhớ lịch học lớp chúng ta là 15h chiều mai (thứ 7) nhé bạn",
                isAlarm: false
            },
            {
                timeData: "07:00",
                content: "Bạn nhớ hoàn thành bài tập đầy đủ trước khi đến lớp nhé!",
                isAlarm: false
            },
        ]
    },    
 ]

```