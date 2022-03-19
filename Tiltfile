load('ext://namespace', 'namespace_inject')
load('ext://restart_process', 'docker_build_with_restart')
load('ext://dotenv', 'dotenv')
dotenv(fn='.env')

#k8s
k8s_yaml(namespace_inject(read_file('./k8s/apps/api/api.yaml'), 'gadget-crawler'))
k8s_yaml(namespace_inject(read_file('./k8s/apps/crawler/crawler.yaml'), 'gadget-crawler'))
k8s_yaml(namespace_inject(read_file('./k8s/apps/datahub/datahub.yaml'), 'gadget-crawler'))

#k8s_deps
k8s_yaml(namespace_inject(read_file('./k8s/deps/mongo/mongo.yaml'), 'gadget-crawler'))
k8s_yaml(namespace_inject(read_file('./k8s/deps/redis/redis.yaml'), 'gadget-crawler'))

#Applications
k8s_resource('api', port_forwards=[3000], resource_deps=['redis'])
k8s_resource('crawler', resource_deps=['redis'])
k8s_resource('datahub', resource_deps=['redis','mongo'])

#Dependencies
k8s_resource('mongo', port_forwards=[27017])
k8s_resource('redis', port_forwards=[6379])

docker_build('base',
  '.',
  {
    'NODE_ENV': 'development'
  },
  './k8s/Dockerfile',
  live_update=[
    sync('./package-lock.json', '/app'),
    sync('./package.json', '/app'),
    run('cd /app && npm install', trigger='./package-lock.json')
    ]
)

docker_build('api',
  '.',
  {
    'NODE_ENV': 'development'
  },
  './k8s/apps/api/Dockerfile',
  live_update=[
    sync('.', '/app/'),
    ]
)

docker_build('crawler',
  '.',
  {
    'NODE_ENV': 'development'
  },
  './k8s/apps/crawler/Dockerfile',
  live_update=[
    sync('.', '/app/'),
    ]
)

docker_build('datahub',
  '.',
  {
    'NODE_ENV': 'development'
  },
  './k8s/apps/datahub/Dockerfile',
  live_update=[
    sync('.', '/app/'),
    ]
)
