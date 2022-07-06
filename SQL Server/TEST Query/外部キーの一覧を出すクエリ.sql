select
    fk.name as [外部キー名],
    fk.is_disabled as [有効/無効],
    fkc.constraint_column_id as [外部キーカラムID],
    ps.name as [参照元スキーマ名],
    pt.name as [参照元テーブル名],
    pc.name as [参照元カラム名],
    rs.name as [参照先スキーマ名],
    rt.name as [参照先テーブル名],
    rc.name as [参照先カラム名],
    'ALTER TABLE [' + ps.name + '].[' + pt.name + '] NOCHECK CONSTRAINT [' + fk.name + '] ' as disabled_query,
    'ALTER TABLE [' + ps.name + '].[' + pt.name + '] WITH CHECK CHECK CONSTRAINT [' + fk.name + '] ' as enabled_query
from sys.foreign_keys as fk
    inner join sys.foreign_key_columns as fkc
        on fk.object_id = fkc.constraint_object_id
    -- 参照元のテーブルとカラムをjoin
    inner join sys.tables as pt
        on fkc.parent_object_id = pt.object_id
    inner join sys.columns as pc
        on fkc.parent_object_id = pc.object_id and
            fkc.parent_column_id = pc.column_id
    inner join sys.schemas as ps
        on pt.schema_id = ps.schema_id
    -- 参照先のテーブルとカラムをjoin
    inner join sys.tables as rt
        on fkc.referenced_object_id = rt.object_id
    inner join sys.columns as rc
        on fkc.referenced_object_id = rc.object_id and
            fkc.referenced_column_id = rc.column_id
    inner join sys.schemas as rs
        on rt.schema_id = rs.schema_id
where rt.name = 'supplier'
and rc.name = 'id'
order by [外部キー名], [外部キーカラムID]