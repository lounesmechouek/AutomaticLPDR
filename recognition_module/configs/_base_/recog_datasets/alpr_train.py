dataset_type = 'OCRDataset'

root = 'tests/data/ocr_alpr_dataset'
img_prefix = f'{root}/'
train_anno_file1 = f'{root}/plaques_labels.txt'

train1 = dict(
    type=dataset_type,
    img_prefix=img_prefix,
    ann_file=train_anno_file1,
    loader=dict(
        type='AnnFileLoader',
        repeat=100,
        file_format='txt',
        file_storage_backend='disk',
        parser=dict(
            type='LineStrParser',
            keys=['filename', 'text'],
            keys_idx=[0, 1],
            separator=' ')),
    pipeline=None,
    test_mode=False)

train_anno_file2 = f'{root}/plaques_labels_val.txt'
train2 = dict(
    type=dataset_type,
    img_prefix=img_prefix,
    ann_file=train_anno_file2,
    loader=dict(
        type='AnnFileLoader',
        repeat=100,
        file_format='txt',
        file_storage_backend='disk',
        parser=dict(type='LineStrParser', keys=['filename', 'text'])),
    pipeline=None,
    test_mode=False)

test_anno_file1 = f'{root}/plaques_labels_test.txt'
test = dict(
    type=dataset_type,
    img_prefix=img_prefix,
    ann_file=test_anno_file1,
    loader=dict(
        type='AnnFileLoader',
        repeat=1,
        file_format='txt',
        file_storage_backend='disk',
        parser=dict(type='LineStrParser', keys=['filename', 'text'])),
    pipeline=None,
    test_mode=True)


train_list = [train1, train2]

test_list = [test]
