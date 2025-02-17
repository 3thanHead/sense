import redis
import json

class RedisClient:
    def __init__(self, host='localhost', port=6379, db=0):
        self.client = redis.StrictRedis(host=host, port=port, db=db)

    def publish(self, channel, data):
        json_data = json.dumps(data)
        self.client.publish(channel, json_data)

if __name__ == "__main__":
    client = RedisClient()
    sample_data = {"key": "value"}
    client.publish("my_channel", sample_data)