create table #test
(
    id INT IDENTITY(1,1) NOT NULL PRIMARY KEY -- primary key column
	, names nvarchar(100)
)

insert into #test values('たまねぎ')
insert into #test values('ほうれんそう')
insert into #test values('れたす')
insert into #test values('きのこ')
insert into #test values('きゃべつ')

select * from #test

select
LAG(id,1) over (order by id) AS id
from  #test

select MAX(hoge.id) FROM (
select
LAG(id,1) over (order by id) AS id
from  #test) AS hoge

drop table #test