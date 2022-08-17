log_config = dict(
    interval=100,
    hooks=[dict(type='TextLoggerHook'),
           dict(type='TensorboardLoggerHook')])
dist_params = dict(backend='nccl')
log_level = 'INFO'
load_from = None
resume_from = None
workflow = [('train', 1)]
opencv_num_threads = 0
mp_start_method = 'fork'
label_convertor = dict(
    type='AttnConvertor', dict_type='DICT91', with_unknown=False, lower=True)
model = dict(
    type='SARNet',
    backbone=dict(type='ResNet31OCR'),
    encoder=dict(
        type='SAREncoder', enc_bi_rnn=False, enc_do_rnn=0.1, enc_gru=False),
    decoder=dict(
        type='ParallelSARDecoder',
        enc_bi_rnn=False,
        dec_bi_rnn=False,
        dec_do_rnn=0,
        dec_gru=False,
        pred_dropout=0.1,
        d_k=512,
        pred_concat=True),
    loss=dict(type='SARLoss'),
    label_convertor=dict(
        type='AttnConvertor',
        dict_type='DICT91',
        with_unknown=False,
        lower=True),
    max_seq_len=30)
optimizer = dict(type='Adam', lr=0.000125)
optimizer_config = dict(grad_clip=None)
lr_config = dict(policy='step', step=[3, 4])
runner = dict(type='EpochBasedRunner', max_epochs=5)
checkpoint_config = dict(interval=1)
img_norm_cfg = dict(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
train_pipeline = [
    dict(type='LoadImageFromFile'),
    dict(
        type='ResizeOCR',
        height=48,
        min_width=48,
        max_width=160,
        keep_aspect_ratio=True,
        width_downsample_ratio=0.25),
    dict(type='ToTensorOCR'),
    dict(type='NormalizeOCR', mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),
    dict(
        type='Collect',
        keys=['img'],
        meta_keys=[
            'filename', 'ori_shape', 'resize_shape', 'text', 'valid_ratio'
        ])
]
test_pipeline = [
    dict(type='LoadImageFromFile'),
    dict(
        type='MultiRotateAugOCR',
        rotate_degrees=[0, 90, 270],
        transforms=[
            dict(
                type='ResizeOCR',
                height=48,
                min_width=48,
                max_width=160,
                keep_aspect_ratio=True,
                width_downsample_ratio=0.25),
            dict(type='ToTensorOCR'),
            dict(
                type='NormalizeOCR', mean=[0.5, 0.5, 0.5], std=[0.5, 0.5,
                                                                0.5]),
            dict(
                type='Collect',
                keys=['img'],
                meta_keys=[
                    'filename', 'ori_shape', 'resize_shape', 'valid_ratio',
                    'img_norm_cfg', 'ori_filename', 'img_shape'
                ])
        ])
]
dataset_type = 'OCRDataset'
root = 'tests/data/ocr_alpr_dataset'
img_prefix = 'tests/data/ocr_alpr_dataset/'
train_anno_file1 = 'tests/data/ocr_alpr_dataset/plaques_labels.jsonl'
train1 = dict(
    type='OCRDataset',
    img_prefix='tests/data/ocr_alpr_dataset/',
    ann_file='tests/data/ocr_alpr_dataset/plaques_labels.jsonl',
    loader=dict(
        type='AnnFileLoader',
        repeat=100,
        file_format='txt',
        file_storage_backend='disk',
        parser=dict(type='LineJsonParser', keys=['filename', 'text'])),
    pipeline=None,
    test_mode=False)
train_anno_file2 = 'tests/data/ocr_alpr_dataset/plaques_labels_val.jsonl'
train2 = dict(
    type='OCRDataset',
    img_prefix='tests/data/ocr_alpr_dataset/',
    ann_file='tests/data/ocr_alpr_dataset/plaques_labels_val.jsonl',
    loader=dict(
        type='AnnFileLoader',
        repeat=100,
        file_format='txt',
        file_storage_backend='disk',
        parser=dict(type='LineJsonParser', keys=['filename', 'text'])),
    pipeline=None,
    test_mode=False)
test_anno_file1 = 'tests/data/ocr_alpr_dataset/plaques_labels_test.jsonl'
test = dict(
    type='OCRDataset',
    img_prefix='tests/data/ocr_alpr_dataset/',
    ann_file='tests/data/ocr_alpr_dataset/plaques_labels_test.jsonl',
    loader=dict(
        type='AnnFileLoader',
        repeat=1,
        file_format='txt',
        file_storage_backend='disk',
        parser=dict(type='LineJsonParser', keys=['filename', 'text'])),
    pipeline=None,
    test_mode=True)
train_list = [
    dict(
        type='OCRDataset',
        img_prefix='tests/data/ocr_alpr_dataset/',
        ann_file='tests/data/ocr_alpr_dataset/plaques_labels.jsonl',
        loader=dict(
            type='AnnFileLoader',
            repeat=100,
            file_format='txt',
            file_storage_backend='disk',
            parser=dict(type='LineJsonParser', keys=['filename', 'text'])),
        pipeline=None,
        test_mode=False)
]
test_list = [
    dict(
        type='OCRDataset',
        img_prefix='tests/data/ocr_alpr_dataset/',
        ann_file='tests/data/ocr_alpr_dataset/plaques_labels_test.jsonl',
        loader=dict(
            type='AnnFileLoader',
            repeat=1,
            file_format='txt',
            file_storage_backend='disk',
            parser=dict(type='LineJsonParser', keys=['filename', 'text'])),
        pipeline=None,
        test_mode=True)
]
data = dict(
    workers_per_gpu=2,
    samples_per_gpu=8,
    train=dict(
        type='UniformConcatDataset',
        datasets=[
            dict(
                type='OCRDataset',
                img_prefix='tests/data/ocr_alpr_dataset/',
                ann_file='tests/data/ocr_alpr_dataset/plaques_labels.jsonl',
                loader=dict(
                    type='AnnFileLoader',
                    repeat=100,
                    file_format='txt',
                    file_storage_backend='disk',
                    parser=dict(
                        type='LineJsonParser', keys=['filename', 'text'])),
                pipeline=None,
                test_mode=False)
        ],
        pipeline=[
            dict(type='LoadImageFromFile'),
            dict(
                type='ResizeOCR',
                height=48,
                min_width=48,
                max_width=160,
                keep_aspect_ratio=True,
                width_downsample_ratio=0.25),
            dict(type='ToTensorOCR'),
            dict(
                type='NormalizeOCR', mean=[0.5, 0.5, 0.5], std=[0.5, 0.5,
                                                                0.5]),
            dict(
                type='Collect',
                keys=['img'],
                meta_keys=[
                    'filename', 'ori_shape', 'resize_shape', 'text',
                    'valid_ratio'
                ])
        ]),
    val=dict(
        type='UniformConcatDataset',
        datasets=[
            dict(
                type='OCRDataset',
                img_prefix='tests/data/ocr_alpr_dataset/',
                ann_file=
                'tests/data/ocr_alpr_dataset/plaques_labels_test.jsonl',
                loader=dict(
                    type='AnnFileLoader',
                    repeat=1,
                    file_format='txt',
                    file_storage_backend='disk',
                    parser=dict(
                        type='LineJsonParser', keys=['filename', 'text'])),
                pipeline=None,
                test_mode=True)
        ],
        pipeline=[
            dict(type='LoadImageFromFile'),
            dict(
                type='MultiRotateAugOCR',
                rotate_degrees=[0, 90, 270],
                transforms=[
                    dict(
                        type='ResizeOCR',
                        height=48,
                        min_width=48,
                        max_width=160,
                        keep_aspect_ratio=True,
                        width_downsample_ratio=0.25),
                    dict(type='ToTensorOCR'),
                    dict(
                        type='NormalizeOCR',
                        mean=[0.5, 0.5, 0.5],
                        std=[0.5, 0.5, 0.5]),
                    dict(
                        type='Collect',
                        keys=['img'],
                        meta_keys=[
                            'filename', 'ori_shape', 'resize_shape',
                            'valid_ratio', 'img_norm_cfg', 'ori_filename',
                            'img_shape'
                        ])
                ])
        ]),
    test=dict(
        type='UniformConcatDataset',
        datasets=[
            dict(
                type='OCRDataset',
                img_prefix='tests/data/ocr_alpr_dataset/',
                ann_file=
                'tests/data/ocr_alpr_dataset/plaques_labels_test.jsonl',
                loader=dict(
                    type='AnnFileLoader',
                    repeat=1,
                    file_format='txt',
                    file_storage_backend='disk',
                    parser=dict(
                        type='LineJsonParser', keys=['filename', 'text'])),
                pipeline=None,
                test_mode=True)
        ],
        pipeline=[
            dict(type='LoadImageFromFile'),
            dict(
                type='MultiRotateAugOCR',
                rotate_degrees=[0, 90, 270],
                transforms=[
                    dict(
                        type='ResizeOCR',
                        height=48,
                        min_width=48,
                        max_width=160,
                        keep_aspect_ratio=True,
                        width_downsample_ratio=0.25),
                    dict(type='ToTensorOCR'),
                    dict(
                        type='NormalizeOCR',
                        mean=[0.5, 0.5, 0.5],
                        std=[0.5, 0.5, 0.5]),
                    dict(
                        type='Collect',
                        keys=['img'],
                        meta_keys=[
                            'filename', 'ori_shape', 'resize_shape',
                            'valid_ratio', 'img_norm_cfg', 'ori_filename',
                            'img_shape'
                        ])
                ])
        ]))
evaluation = dict(interval=1, by_epoch=True, metric='acc')
work_dir = 'train_sar_results'
gpu_ids = [0]
